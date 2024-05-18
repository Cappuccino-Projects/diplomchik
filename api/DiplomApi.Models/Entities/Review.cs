using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DiplomApi.Models.Entities;

public class Review
{
    [Key]
    public int Id { get; set; }

    [Column("user_id")]
    public int? UserId { get; set; }

    [Column("place_id")]
    public int PlaceId { get; set; }

    public int Rank { get; set; }

    public string? Comment { get; set; }

    [Column("photo_path")]
    public string? PhotoPath { get; set; }

    public virtual Place Place { get; set; } = null!;

    public virtual User? User { get; set; }
}
