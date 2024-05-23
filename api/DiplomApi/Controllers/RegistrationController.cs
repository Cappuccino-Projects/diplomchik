using Microsoft.AspNetCore.Mvc;
using DiplomApi.Interfaces;
using Mapster;
using DiplomApi.Models.DTOs;
using DiplomApi.Models.Entities;

namespace DiplomApi.Controllers
{
    [ApiController]
    [Route("api/registration")]
    public class RegistrationController(IRepository<User> userRepository)
        : ControllerBase
    {
        [HttpPost]
        public IActionResult RegisterUser([FromBody] RegistrationDto registrationDto)
        {
            var newUser = registrationDto.Adapt<User>();

            userRepository.Insert(newUser);

            return Ok(newUser);
        }
    }
}