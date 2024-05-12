using System;
using System.Collections.Generic;

namespace DiplomApi.Models.Entities;

public class Rank
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public virtual ICollection<User> Users { get; set; } = new List<User>();
}
