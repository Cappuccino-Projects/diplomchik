using DiplomApi.Models.Abstract;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace DiplomApi.Models.Entities;

[Table("products")]
public class Product : BaseEntity
{
    [Column("type_id")]
    public int TypeId { get; set; }

    public decimal Price { get; set; }

    [Column("icon_path")]
    public string? IconPath { get; set; }

    public virtual ProductType Type { get; set; } = null!;
}
