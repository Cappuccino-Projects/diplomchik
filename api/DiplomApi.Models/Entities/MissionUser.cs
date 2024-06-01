using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DiplomApi.Models.Entities;

[Table("missions_users")]
public class MissionUser
{
    [Column("mission_id")]
    public int MissionId { get; set; }

    [Column("user_id")]
    public int UserId { get; set; }

    [Column("status_id")]
    public int StatusId { get; set; }

    [Column("due_date")]
    public DateTime? DueDate { get; set; }

    public virtual Mission Mission { get; set; } = null!;

    public virtual Status Status { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
