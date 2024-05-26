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
    }
}