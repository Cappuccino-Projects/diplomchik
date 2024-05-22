using Mapster;
using Microsoft.AspNetCore.Mvc;
using DiplomApi.Interfaces;
using DiplomApi.Models.DTOs;
using DiplomApi.Models.DTOs.ChangeType;
using DiplomApi.Models.Entities;

namespace DiplomApi.Controllers
{
    [ApiController]
    [Route("api/changeType")]
    public class ChangeTypeController(IRepository<ChangeType> changeTypeRepository) : ControllerBase
    {
        [HttpGet]
        public IActionResult GetAllChangeTypes()
        {
            var changeTypes = changeTypeRepository.GetAll();

            return Ok(changeTypes);
        }

        [HttpGet("{id:int}")]
        public IActionResult GetChangeTypeById(int id)
        {
            var changeType = changeTypeRepository.GetById(id);

            return Ok(changeType);
        }

        [HttpPost]
        public IActionResult AddChangeType([FromBody] ChangeTypeCreationDto changeTypeDto)
        {
            var changeType = changeTypeDto.Adapt<ChangeType>();

            changeTypeRepository.Insert(changeType);
            return CreatedAtAction(nameof(GetChangeTypeById), new { id = changeType.Id }, changeType);
        }

        [HttpPut("{id:int}")]
        public IActionResult UpdateChangeType(int id, ChangeTypeUpdateDto changeTypeDto)
        {

            var changeType = changeTypeDto.Adapt<ChangeType>();
            changeType.Id = id;

            changeTypeRepository.Update(changeType);
            return NoContent();
        }

        [HttpDelete("{id:int}")]
        public IActionResult DeleteChangeType(int id)
        {
            changeTypeRepository.Delete(id);
            return NoContent();
        }
    }
}