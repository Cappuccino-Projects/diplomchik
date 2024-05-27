using Microsoft.AspNetCore.Mvc;
using DiplomApi.Interfaces;
using DiplomApi.Models.DTOs;
using DiplomApi.Models.Entities;

namespace DiplomApi.Controllers
{
    [ApiController]
    [Route("api/user/{userId:int}/appearance")]
    public class UserAppearanceController(IRepository<User> userRepository, IRepository<Product> productRepository,
                                          IRepository<UserProduct> userProductRepository) : ControllerBase
    {
        [HttpGet]
        public IActionResult GetUserAppearance(int userId)
        {
            var userAppearance = new UserAppearanceCreationDto();

            var user = userRepository.GetById(userId);
            var userProducts = userProductRepository.GetAll().Where(up => up.UserId == user.Id && up.Active == 1)
                                                             .Select(up => productRepository.GetById(up.ProductId));

            if (userProducts.Any(p => p.TypeId == 2))
                userAppearance.Avatar = userProducts.First(p => p.TypeId == 2).Id;
            if (userProducts.Any(p => p.TypeId == 1))
                userAppearance.Character = userProducts.First(p => p.TypeId == 1).Id;

            return Ok(userAppearance);
        }

        [HttpPut]
        public IActionResult SetUserAppearance(int userId, int avatar, int character)
        {
            var userAppearance = new UserAppearanceCreationDto() { Avatar = avatar, Character = character };

            var user = userRepository.GetById(userId);
            var userProducts = userProductRepository.GetAll().Where(up => up.UserId == user.Id);

            if (productRepository.GetById(avatar).TypeId != 2 || productRepository.GetById(character).TypeId != 1)
                return Problem(title: "Specified goods is not user appearance!", statusCode: 400);
            if (userProducts.All(up => up.ProductId != avatar) || userProducts.All(up => up.ProductId != character))
                return Problem(title: "User has not purchased the specified goods!", statusCode: 400);
            userProducts.Where(up => up.Active == 1).ToList().ForEach(up => up.Active = 0);
            userProducts.First(up => up.ProductId == avatar).Active = 1;
            userProducts.First(up => up.ProductId == character).Active = 1;

            return Ok(userAppearance);
        }
    }
}