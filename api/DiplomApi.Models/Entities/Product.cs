using System;
using System.Collections.Generic;

namespace DiplomApi.Models.Entities;

public class Product
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public int TypeId { get; set; }

    public decimal Price { get; set; }

    public string? IconPath { get; set; }

    public virtual ProductType Type { get; set; } = null!;

    public virtual ICollection<UserProduct> UsersProducts { get; set; } = new List<UserProduct>();
}
