using System;
using System.Collections.Generic;

namespace DiplomApi.Models.DTOs;

public class MissionUserCreationDto
{
    public int StatusId { get; set; }

    public DateTime DueDate { get; set; }
}
