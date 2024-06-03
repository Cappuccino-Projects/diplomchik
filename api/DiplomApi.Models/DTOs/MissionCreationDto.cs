using System;
using System.Collections.Generic;

namespace DiplomApi.Models.DTOs;

public class MissionCreationDto
{
    public string Title { get; set; } = null!;

    public string? Description { get; set; }

    public string? IconPath { get; set; }

    public int ExpAward { get; set; }
}
