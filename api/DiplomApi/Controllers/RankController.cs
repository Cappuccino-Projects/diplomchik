using Mapster;
using Microsoft.AspNetCore.Mvc;
using DiplomApi.Interfaces;
using DiplomApi.Models.DTOs;
using DiplomApi.Models.DTOs.Rank;
using DiplomApi.Models.Entities;

namespace DiplomApi.Controllers
{
    [ApiController]
    [Route("api/rank")]
    public class RankController(IRepository<Rank> rankRepository) : ControllerBase
    {
        [HttpGet]
        public IActionResult GetAllRanks()
        {
            var ranks = rankRepository.GetAll().OrderBy(r => r.Id);

            return Ok(ranks);
        }

        [HttpGet("{id:int}")]
        public IActionResult GetRankById(int id)
        {
            var rank = rankRepository.GetById(id);

            return Ok(rank);
        }

        [HttpPost]
        public IActionResult AddRank([FromBody] RankCreationDto rankDto)
        {
            var rank = rankDto.Adapt<Rank>();

            rankRepository.Insert(rank);
            return CreatedAtAction(nameof(GetRankById), new { id = rank.Id }, rank);
        }

        [HttpPut("{id:int}")]
        public IActionResult UpdateRank(int id, RankUpdateDto rankDto)
        {
            var rank = rankDto.Adapt<Rank>();
            rank.Id = id;

            rankRepository.Update(rank);
            return NoContent();
        }

        [HttpDelete("{id:int}")]
        public IActionResult DeleteRank(int id)
        {
            rankRepository.Delete(id);
            return NoContent();
        }
    }
}