using System;
using System.Collections.Generic;

namespace DiplomApi.Models.Entities;

public class Review
{
    public int Id { get; set; }

    public int? UserId { get; set; }

    public int PlaceId { get; set; }

    public int Rank { get; set; }

    public string? Comment { get; set; }

    public string? PhotoPath { get; set; }

    public virtual Place Place { get; set; } = null!;

    public virtual User? User { get; set; }
}
