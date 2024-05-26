using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DiplomApi.Models.Entities;

[Table("users")]
public class User
{
    [Key]
    public int Id { get; set; }

    public string Login { get; set; } = null!;

    [Column("display_name")]
    public string DisplayName { get; set; } = null!;

    public string Email { get; set; } = null!;

    [Column("password_hash")]
    public string PasswordHash { get; set; } = null!;

    [Column("city_id")]
    public int CityId { get; set; }

    [Column("avatar_path")]
    public string? AvatarPath { get; set; }

    [Column("theme_id")]
    public int? ThemeId { get; set; }

    [Column("rank_id")]
    public int RankId { get; set; }

    public int Experience { get; set; }

    public decimal Balance { get; set; }

    //[Column("is_admin")]
    //public bool IsAdmin { get; set; }

    public virtual City City { get; set; } = null!;

    //public virtual ICollection<MissionUser> MissionsUsers { get; set; } = new List<MissionUser>();

    //public virtual ICollection<Review> Reviews { get; set; } = new List<Review>();

    public virtual Theme? Theme { get; set; }

    public virtual Rank? Rank { get; set; }

    //public virtual ICollection<UserProduct> UsersProducts { get; set; } = new List<UserProduct>();
}
