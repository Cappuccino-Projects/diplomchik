using DiplomApi.Models.Abstract;
using System;
using System.Collections.Generic;

namespace DiplomApi.Models.Entities;

public class Status : BaseEntity
{
    public string? Description { get; set; }
}
