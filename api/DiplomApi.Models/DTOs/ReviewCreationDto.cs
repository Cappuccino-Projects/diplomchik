using System;
using System.Collections.Generic;

namespace DiplomApi.Models.DTOs;

public class ReviewCreationDto
{
    public int? UserId { get; set; }

    public int PlaceId { get; set; }

    public int Rank { get; set; }

    public string? Comment { get; set; }

    public string? PhotoPath { get; set; }
}
