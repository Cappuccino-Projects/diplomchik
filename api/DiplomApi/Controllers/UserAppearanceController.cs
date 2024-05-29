using Microsoft.AspNetCore.Mvc;
using DiplomApi.Interfaces;
using DiplomApi.Models.DTOs;
using DiplomApi.Models.Entities;
using DiplomApi.Repositories;

namespace DiplomApi.Controllers
{
    [ApiController]
    [Route("api/user/{userId:int}/appearance")]
    public class UserAppearanceController(IRepository<User> userRepository, IRepository<Product> productRepository,
                                          IRepository<UserProduct> userProductRepository) : ControllerBase
    {
        [HttpGet]
        public IActionResult GetUserAppearance(int userId) => Ok(GetUserAppearanceInternal(userId));

        [HttpPut]
        public IActionResult SetUserAppearance(int userId, int? avatar, int? character)
        {
            var userAppearance = GetUserAppearanceInternal(userId);
            var userProducts = userProductRepository.GetAll().Where(up => up.UserId == userId);
            var userAvatar = userProducts.FirstOrDefault(up => up.ProductId == (avatar ?? userAppearance.Avatar));
            var userCharacter = userProducts.FirstOrDefault(up => up.ProductId == (character ?? userAppearance.Character));

            if (avatar is null && character is null)
                return BadRequest("Blank request!");
            if ((avatar is not null && productRepository.GetById((int)avatar).TypeId != 2) ||
                (character is not null && productRepository.GetById((int)character).TypeId != 1))
                return BadRequest("Specified goods is not user appearance!");
            if ((avatar is not null && userProducts.All(up => up.ProductId != avatar)) ||
                (character is not null && userProducts.All(up => up.ProductId != character)))
                return BadRequest("User has not purchased the specified goods!");
            userProducts.Where(up => up.Active == 1).ToList().ForEach(up => up.Active = 0);

            if (userAvatar is not null)
            {
                userAvatar.Active = 1;
                userAppearance.Avatar = userAvatar.ProductId;
                userProductRepository.Update(userAvatar);
            } 
            if (userCharacter is not null)
            {
                userCharacter.Active = 1;
                userAppearance.Character = userCharacter.ProductId;
                userProductRepository.Update(userCharacter);
            }

            return Ok(GetUserAppearanceInternal(userId));
        }

        private UserAppearanceCreationDto GetUserAppearanceInternal(int userId)
        {
            var userAppearance = new UserAppearanceCreationDto();

            var user = userRepository.GetById(userId);
            var userProducts = userProductRepository.GetAll().Where(up => up.UserId == user.Id && up.Active == 1)
                                                             .Select(up => productRepository.GetById(up.ProductId));

            if (userProducts.Any(p => p.TypeId == 2))
                userAppearance.Avatar = userProducts.First(p => p.TypeId == 2).Id;
            if (userProducts.Any(p => p.TypeId == 1))
                userAppearance.Character = userProducts.First(p => p.TypeId == 1).Id;

            return userAppearance;
        }
    }
}