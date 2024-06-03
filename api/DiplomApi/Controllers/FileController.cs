using System.IO.Compression;
using Microsoft.AspNetCore.Mvc;
using DiplomApi.Contexts;
using Mapster;
using File = DiplomApi.Models.Entities.File;
using DiplomApi.Models.DTOs;
using DiplomApi.Repositories;

namespace DiplomApi.Controllers;

[Route("api/files")]
[ApiController]
public sealed class FileController(
    TrashBinsContext context,
    IConfiguration configuration,
    ILogger<FileController> logger) : ControllerBase
{
    private readonly Dictionary<string, string> _permittedExtensions = new()
    {
        { ".jpg"  , "image/jpeg" },
        { ".jpeg" , "image/jpeg" },
        { ".png"  , "image/png" },
        { ".gif"  , "image/gif" },
        { ".bmp"  , "image/bmp" },
        { ".webp" , "image/webp" },
    };

    [HttpGet()]
    public IActionResult GetPath(string? fileName = null)
    {
        if (fileName == null)
            return Ok(context.Files.ToList().OrderBy(f => f.Name).Select(f => new FileCreationDto { Name = f.Name, Path = $"/bucket/{f.Path}" }));
        var file = context.Files.FirstOrDefault(f => f.Name == fileName);
        if (file == null)
            return BadRequest("File doesn't exists");
        return Ok($"/bucket/{file.Path}");
    }

    [HttpGet("{fileName}")]
    public IActionResult GetImage(string fileName)
    {
        var file = context.Files.FirstOrDefault(f => f.Name == fileName);
        if (file == null)
            return BadRequest("File doesn't exists");

        var uploadDirectory = configuration.GetValue<string>("Storage");

        if (string.IsNullOrEmpty(uploadDirectory))
            throw new NullReferenceException(nameof(uploadDirectory));

        return PhysicalFile(Path.Combine(GetImageDirPath(), file.Path), _permittedExtensions[Path.GetExtension(file.Path)]);
    }

    [HttpPost("upload")]
    public async Task<IActionResult> Upload(IFormFile file, string? fileName = null)
    {
        if (file == null)
            return BadRequest("File not uploaded");

        if (!_permittedExtensions.ContainsKey(Path.GetExtension(file.FileName.ToLower())))
            return BadRequest("File is not an image");

        var filePath = Guid.NewGuid().ToString("N") + Path.GetExtension(file.FileName);

        await using (var stream = new FileStream(Path.Combine(GetImageDirPath(), filePath), FileMode.Create))
            await file.CopyToAsync(stream);

        var uploadedFile = new FileCreationDto()
        {
            Name = fileName ?? Path.GetFileNameWithoutExtension(file.FileName),
            Path = filePath
        };

        await context.Files.AddAsync(uploadedFile.Adapt<File>());
        await context.SaveChangesAsync();

        return Ok(uploadedFile);
    }

    private string GetImageDirPath()
    {
        var uploadsDir = configuration.GetValue<string>("Storage");

        if (string.IsNullOrEmpty(uploadsDir))
            throw new NullReferenceException(nameof(uploadsDir));

        return Path.Combine(Directory.GetCurrentDirectory(), uploadsDir);
    }
}
