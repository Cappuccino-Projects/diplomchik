using System;
using System.Collections.Generic;

namespace DiplomApi.Models.DTOs;

public class UserCreationDto
{
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

    public byte IsAdmin { get; set; }
}
