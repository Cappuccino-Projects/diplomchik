using System;
using System.Collections.Generic;

namespace DiplomApi.Models.DTOs;

public class ChangeCreationDto
{
    public int UserId { get; set; }

    public int PlaceId { get; set; }

    public int TypeId { get; set; }

    public DateTime? Timestamp { get; set; }
}
