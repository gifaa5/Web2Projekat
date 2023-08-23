using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebShop.Dto;
using WebShop.Interfaces;

namespace WebShop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CheckController : ControllerBase
    {

        ICheckService _service;

        public CheckController(ICheckService service)
        {
            _service = service;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody]LoginDto loginDto)
        {
            string token = await _service.Login(loginDto);
            if (token == "Korisnik ne postoji" || token == "Neispravna lozinka" || token == "Vas zahtev je odbijen" || token == "Jos ste na cekanju")
                return BadRequest(token);
            return Ok(token);
        }

        [HttpPost("register")]
        public async Task<IActionResult> Login([FromForm] RegisterDto registerDto)
        {
            string token = await _service.Register(registerDto);
            return Ok(token);
        }
    }
}
