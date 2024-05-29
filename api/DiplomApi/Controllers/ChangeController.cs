using Mapster;
using Microsoft.AspNetCore.Mvc;
using DiplomApi.Interfaces;
using DiplomApi.Models.DTOs;
using DiplomApi.Models.DTOs.Change;
using DiplomApi.Models.Entities;

namespace DiplomApi.Controllers
{
    [ApiController]
    [Route("api/change")]
    public class ChangeController(IRepository<Change> changeRepository) : ControllerBase
    {
        [HttpGet]
        public IActionResult GetAllChanges()
        {
            var changes = changeRepository.GetAll();

            return Ok(changes);
        }

        [HttpGet("{id:int}")]
        public IActionResult GetChangeById(int id)
        {
            var change = changeRepository.GetById(id);

            return Ok(change);
        }

        [HttpPost]
        public IActionResult AddChange([FromBody] ChangeCreationDto changeDto)
        {
            var change = changeDto.Adapt<Change>();

            changeRepository.Insert(change);
            return CreatedAtAction(nameof(GetChangeById), new { id = change.Id }, change);
        }

        [HttpPut("{id:int}")]
        public IActionResult UpdateChange(int id, ChangeUpdateDto changeDto)
        {

            var change = changeDto.Adapt<Change>();
            change.Id = id;

            changeRepository.Update(change);
            return NoContent();
        }

        [HttpDelete("{id:int}")]
        public IActionResult DeleteChange(int id)
        {
            changeRepository.Delete(id);
            return NoContent();
        }
    }
}