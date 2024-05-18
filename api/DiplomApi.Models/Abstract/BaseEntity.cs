using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DiplomApi.Models.Abstract;

public class BaseEntity
{
    [Key] 
    [Column("id")]
    [Required(ErrorMessage = "id не определён")]
    public int Id { get; set; }

    [Required]
    [MaxLength(100)]
    [Column("name")]
    public string Name { get; set; } = null!;
}