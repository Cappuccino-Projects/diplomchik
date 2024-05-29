using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DiplomApi.Models.Entities;

[Table("missions")]
public class Mission
{
    [Key]
    public int Id { get; set; }

    public string Title { get; set; } = null!;

    public string? Description { get; set; }

    [Column("icon_path")]
    public string? IconPath { get; set; }

    [Column("exp_award")]
    public int ExpAward { get; set; }

    [Column("due_timestamp")]
    public DateTime? DueTimestamp { get; set; }

    //public virtual ICollection<MissionUser> MissionsUsers { get; set; } = new List<MissionUser>();
}
