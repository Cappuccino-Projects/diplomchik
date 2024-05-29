using System;
using System.Collections.Generic;

namespace DiplomApi.Models.DTOs;

public class PlaceTypeCreationDto
{
    public string Name { get; set; } = null!;

    public string? Icon { get; set; }
}
