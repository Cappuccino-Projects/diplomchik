using System;
using System.Collections.Generic;

namespace DiplomApi.Models.DTOs;

public class ProductCreationDto
{
    public string Name { get; set; } = null!;

    public int TypeId { get; set; }

    public decimal Price { get; set; }

    public string? IconPath { get; set; }
}
