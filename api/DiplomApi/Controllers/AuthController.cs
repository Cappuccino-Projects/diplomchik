using Microsoft.AspNetCore.Mvc;
using DiplomApi.Interfaces;
using Mapster;
using Microsoft.EntityFrameworkCore;
using DiplomApi.Contexts;
using DiplomApi.Models.DTOs;
using DiplomApi.Models.Entities;

namespace DiplomApi.Controllers
{
    // 0fe41223-993b-4df4-b222-e9aa4b5824b4 - Пользователь
    // a76182e2-7f23-4575-907c-289cbb103ba2 - Администратор
    [ApiController]
    [Route("api/auth")]
    public class AuthController(TrashBinsContext context) : ControllerBase
    {
        [HttpPost]
        public IActionResult Authenticate([FromBody] AuthDto auth)
        {
            var result = context.Users
                .FirstOrDefault(o =>
                    (o.Email == auth.Login || o.Login == auth.Login) &&
                    o.PasswordHash == auth.Password);

            if (result == null) return NotFound();

            return Ok(result);
        }
    }

    public class AuthDto {
        public string Login { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }
}