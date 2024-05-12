using System;
using System.Collections.Generic;

namespace DiplomApi.Models.Entities;

public class User
{
    public int Id { get; set; }

    public string Login { get; set; } = null!;

    public string DisplayName { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string PasswordHash { get; set; } = null!;

    public int CityId { get; set; }

    public string? AvatarPath { get; set; }

    public int? ThemeId { get; set; }

    public int RankId { get; set; }

    public int Experience { get; set; }

    public decimal Balance { get; set; }

    public virtual City City { get; set; } = null!;

    public virtual ICollection<MissionUser> MissionsUsers { get; set; } = new List<MissionUser>();

    public virtual ICollection<Review> Reviews { get; set; } = new List<Review>();

    public virtual Theme? Theme { get; set; }

    public virtual Rank? Rank { get; set; }

    public virtual ICollection<UserProduct> UsersProducts { get; set; } = new List<UserProduct>();
}
