using Microsoft.AspNetCore.Mvc;
using DiplomApi.Interfaces;
using DiplomApi.Models.DTOs;
using DiplomApi.Models.DTOs.UserProduct;
using DiplomApi.Models.Entities;

namespace DiplomApi.Controllers
{
    [Route("api/user/{userId:int}/product")]
    [ApiController]
    public class UserProductController(ICompositeKeyRepository<UserProduct> userProductRepository)
        : ControllerBase
    {
        [HttpGet]
        public IActionResult GetAll(int userId)
        {
            var result = userProductRepository.GetAll()
                .Where(u => u.UserId == userId);
            return Ok(result);
        }

        [HttpGet("{productId:int}")]
        public IActionResult GetById(int userId, int productId)
        {
            var result = userProductRepository.GetById(userId, productId);
            return Ok(result);
        }

        [HttpPost()]
        public IActionResult Create(int userId, int productId, [FromBody] UserProductCreationDto userProductDto)
        {
            var userProduct = new UserProduct
            {
                UserId = userId,
                ProductId = productId,
                Active = userProductDto.Active
            };

            userProductRepository.Insert(userProduct);

            return CreatedAtAction(nameof(Create), new { userId = userProduct.UserId, productId = userProduct.ProductId }, userProduct);
        }

        [HttpPut("{productId:int}")]
        public IActionResult Edit(int userId, int productId, [FromBody] UserProductUpdateDto userProductDto)
        {
            var result = userProductRepository.GetAll()
                .FirstOrDefault(u => u.UserId == userId && u.ProductId == productId);

            if (result == null) return NotFound();

            result.Active = userProductDto.Active;

            userProductRepository.Update(result);

            return NoContent();
        }

        [HttpDelete("{productId:int}")]
        public IActionResult Delete(int userId, int productId)
        {
            var result = userProductRepository.GetAll()
                .FirstOrDefault(u => u.UserId == userId && u.ProductId == productId);

            if (result == null) return NotFound();

            userProductRepository.Delete(userId, productId);

            return NoContent();
        }
    }
}