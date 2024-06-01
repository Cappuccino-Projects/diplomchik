using Microsoft.AspNetCore.Mvc;
using DiplomApi.Interfaces;
using DiplomApi.Models.DTOs;
using DiplomApi.Models.DTOs.MissionUser;
using DiplomApi.Models.Entities;
using DiplomApi.Repositories;

namespace DiplomApi.Controllers
{
    [Route("api/user/{userId:int}/mission")]
    [ApiController]
    public class MissionUserController(ICompositeKeyRepository<MissionUser> missionUserRepository)
        : ControllerBase
    {
        [HttpGet]
        public IActionResult GetAll(int userId)
        {
            var result = missionUserRepository.GetAll()
                .Where(u => u.UserId == userId);
            return Ok(result);
        }

        [HttpGet("{missionId:int}")]
        public IActionResult GetById(int userId, int missionId)
        {
            var result = missionUserRepository.GetById(userId, missionId);
            return Ok(result);
        }

        [HttpPost()]
        public IActionResult Create(int userId, int missionId, [FromBody] MissionUserCreationDto missionUserDto)
        {
            var missionUser = new MissionUser
            {
                UserId = userId,
                MissionId = missionId,
                StatusId = missionUserDto.StatusId
            };

            missionUserRepository.Insert(missionUser);

            return CreatedAtAction(nameof(Create), new { userId = missionUser.UserId, missionId = missionUser.MissionId }, missionUser);
        }

        [HttpPut("{missionId:int}")]
        public IActionResult Edit(int userId, int missionId, [FromBody] MissionUserUpdateDto missionUserUpdateDto)
        {
            var result = missionUserRepository.GetAll()
                .FirstOrDefault(u => u.UserId == userId && u.MissionId == missionId);

            if (result == null) return NotFound();

            result.StatusId = missionUserUpdateDto.StatusId;

            missionUserRepository.Update(result);

            return NoContent();
        }

        [HttpDelete("{missionId:int}")]
        public IActionResult Delete(int userId, int missionId)
        {
            var result = missionUserRepository.GetAll()
                .FirstOrDefault(u => u.UserId == userId && u.MissionId == missionId);

            if (result == null) return NotFound();

            missionUserRepository.Delete(userId, missionId);

            return NoContent();
        }
    }
}