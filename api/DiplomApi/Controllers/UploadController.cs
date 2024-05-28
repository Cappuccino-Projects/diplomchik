using System.IO.Compression;
using Microsoft.AspNetCore.Mvc;
using DiplomApi.Contexts;
using Mapster;
using File = DiplomApi.Models.Entities.File;

namespace DiplomApi.Controllers;

[Route("api/files")]
[ApiController]
public sealed class UploadController(
    TrashBinsContext context,
    IConfiguration configuration,
    ILogger<UploadController> logger) : ControllerBase
{
    private readonly List<string> _permittedExtensions = [ ".jpg", ".jpeg", ".png", ".gif", ".bmp", ".webp" ];

    [HttpPost("upload")]
    public async Task<IActionResult> Upload([FromForm] List<IFormFile>? files)
    {
        if (files == null || files.Count == 0)
            return BadRequest("No files were uploaded");

        if (files.Any(t => !_permittedExtensions.Contains(Path.GetExtension(t.FileName.ToLower()))))
            return BadRequest("Some files are not valid images");

        var uploadDirectory = configuration.GetValue<string>("Storage");

        if (string.IsNullOrEmpty(uploadDirectory))
            throw new NullReferenceException(nameof(uploadDirectory));

        Console.WriteLine(uploadDirectory);

        var uploadPath = Path.Combine(Directory.GetCurrentDirectory(), uploadDirectory);

        Console.WriteLine(uploadPath);
        
        if (!Directory.Exists(uploadPath))
            Directory.CreateDirectory(uploadPath);

        var uploadedFiles = new List<File>();

        foreach (var file in files)
        {
            if (file.Length <= 0) continue;

            var currentFileName = file.FileName;

            var filePath = Path.Combine(uploadDirectory, currentFileName);

            await using (var stream = new FileStream(filePath, FileMode.Create))
                await file.CopyToAsync(stream);

            uploadedFiles.Add(new { Name = currentFileName }.Adapt<File>());
        }

        await context.Files.AddRangeAsync(uploadedFiles);
        await context.SaveChangesAsync();

        return Ok(new { files = uploadedFiles });
    }
}