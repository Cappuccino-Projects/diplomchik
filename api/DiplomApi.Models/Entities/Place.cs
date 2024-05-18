using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DiplomApi.Models.Entities;

public class Place
{
    [Key]
    public int Id { get; set; }

    public string? Title { get; set; }

    [Column("type_id")]
    public int TypeId { get; set; }

    public string? Address { get; set; }

    public decimal Latitude { get; set; }

    public decimal Longitude { get; set; }

    [Column("photo_path")]
    public string? PhotoPath { get; set; }

    //public virtual ICollection<Review> Reviews { get; set; } = new List<Review>();

    public virtual PlaceType Type { get; set; } = null!;
}
