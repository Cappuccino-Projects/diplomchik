using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DiplomApi.Models.Entities;

[Table("users_places")]
public class UserPlace
{
    [Column("user_id")]
    public int UserId { get; set; }

    [Column("place_id")]
    public int PlaceId { get; set; }

    public virtual Place Place { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
