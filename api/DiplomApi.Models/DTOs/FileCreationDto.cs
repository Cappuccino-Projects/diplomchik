using System;
using System.Collections.Generic;

namespace DiplomApi.Models.DTOs;

public class FileCreationDto
{
    public string Name { get; set; } = null!;

    public string Path { get; set; } = null!;
}
