using DiplomApi.Models.Abstract;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace DiplomApi.Models.Entities;

[Table("place_types")]
public class PlaceType : BaseEntity
{
    public string? Icon { get; set; }
}
