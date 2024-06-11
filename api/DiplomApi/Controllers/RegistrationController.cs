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
            var newUser = new User();

            if (registrationDto.Password != registrationDto.ConfirmPassword)
                return BadRequest("Пароли не совпадают");

            if (userRepository.GetAll().Any(u => u.Login == registrationDto.Login))
                return BadRequest("Пользователь с таким логином уже зарегистрирован!");

            newUser.Email = registrationDto.Email;
            newUser.Login = registrationDto.Login;
            newUser.DisplayName = registrationDto.DisplayName;
            newUser.PasswordHash = registrationDto.Password;
            newUser.CityId = registrationDto.CityId;

            userRepository.Insert(newUser);

            return Ok(newUser);
        }
    }
}