using System.IO.Compression;
using Microsoft.AspNetCore.Mvc;
using DiplomApi.Contexts;
using Mapster;
using File = DiplomApi.Models.Entities.File;
using DiplomApi.Models.DTOs;

namespace DiplomApi.Controllers;

[Route("api/files")]
[ApiController]
public sealed class FileController(
    TrashBinsContext context,
    IConfiguration configuration,
    ILogger<FileController> logger) : ControllerBase
{
    private readonly List<string> _permittedExtensions = [ ".jpg", ".jpeg", ".png", ".gif", ".bmp", ".webp" ];

    [HttpGet()]
    public IActionResult GetPath(string fileName)
    {
        var file = context.Files.FirstOrDefault(f => f.Name == fileName);
        if (file == null)
            return BadRequest("File doesn't exists");
        return Ok($"bucket/${file.Path}");
    }

    [HttpPost("upload")]
    public async Task<IActionResult> Upload(IFormFile file, string? fileName = null)
    {
        if (file == null)
            return BadRequest("File not uploaded");

        if (!_permittedExtensions.Contains(Path.GetExtension(file.FileName.ToLower())))
            return BadRequest("File is not an image");

        var uploadDirectory = configuration.GetValue<string>("Storage");

        if (string.IsNullOrEmpty(uploadDirectory))
            throw new NullReferenceException(nameof(uploadDirectory));

        Console.WriteLine(uploadDirectory);

        var uploadPath = Path.Combine(Directory.GetCurrentDirectory(), uploadDirectory);

        Console.WriteLine(uploadPath);
        
        if (!Directory.Exists(uploadPath))
            Directory.CreateDirectory(uploadPath);

        var filePath = Guid.NewGuid().ToString("N") + Path.GetExtension(file.FileName);

        await using (var stream = new FileStream(Path.Combine(uploadDirectory, filePath), FileMode.Create))
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
}
