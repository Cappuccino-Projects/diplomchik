using Microsoft.AspNetCore.Mvc;
using DiplomApi.Interfaces;
using DiplomApi.Models.DTOs;
using DiplomApi.Models.DTOs.UserPlace;
using DiplomApi.Models.Entities;

namespace DiplomApi.Controllers
{
    [Route("api/user/{userId:int}/favorites")]
    [ApiController]
    public class UserPlaceController(ICompositeKeyRepository<UserPlace> userPlaceRepository)
        : ControllerBase
    {
        [HttpGet]
        public IActionResult GetAll(int userId)
        {
            var result = userPlaceRepository.GetAll()
                .Where(u => u.UserId == userId);
            return Ok(result);
        }

        [HttpGet("{placeId:int}")]
        public IActionResult GetById(int userId, int placeId)
        {
            var result = userPlaceRepository.GetById(userId, placeId);
            return Ok(result);
        }

        [HttpPost()]
        public IActionResult Create(int userId, int placeId)
        {
            var userPlace = new UserPlace
            {
                UserId = userId,
                PlaceId = placeId
            };

            userPlaceRepository.Insert(userPlace);

            return CreatedAtAction(nameof(Create), new { userId = userPlace.UserId, productId = userPlace.PlaceId }, userPlace);
        }

        [HttpPut("{placeId:int}")]
        public IActionResult Edit(int userId, int placeId)
        {
            var result = userPlaceRepository.GetAll()
                .FirstOrDefault(u => u.UserId == userId && u.PlaceId == placeId);

            if (result == null) return NotFound();

            userPlaceRepository.Update(result);

            return NoContent();
        }

        [HttpDelete("{placeId:int}")]
        public IActionResult Delete(int userId, int placeId)
        {
            var result = userPlaceRepository.GetAll()
                .FirstOrDefault(u => u.UserId == userId && u.PlaceId == placeId);

            if (result == null) return NotFound();

            userPlaceRepository.Delete(userId, placeId);

            return NoContent();
        }
    }
}