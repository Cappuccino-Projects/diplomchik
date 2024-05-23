using DiplomApi.Models.Abstract;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DiplomApi.Models.Entities;

[Table("changes")]
public class Change
{
    [Key]
    public int Id { get; set; }

    [Column("user_id")]
    public int UserId { get; set; }

    [Column("place_id")]
    public int PlaceId { get; set; }

    [Column("type_id")]
    public int TypeId { get; set; }

    public DateTime? Timestamp { get; set; }

    public virtual User User { get; set; } = null!;

    public virtual Place Place { get; set; } = null!;

    public virtual ChangeType Type { get; set; } = null!;
}
