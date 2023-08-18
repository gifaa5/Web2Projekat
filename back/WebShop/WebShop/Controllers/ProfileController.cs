using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebShop.Dto;
using WebShop.Interfaces;

namespace WebShop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProfileController : ControllerBase
    {
        IProfileService profileService;

        public ProfileController(IProfileService profileService)
        {
            this.profileService = profileService;
        }

        [Authorize]
        [HttpGet("getProfileInfo")]
        public async Task<IActionResult> GetProfileInfo()
        {
            if (!int.TryParse(User.Claims.First(c => c.Type == "Id").Value, out int id))
                return BadRequest("Greska pri dobavljanju informacija");

            ProfileDto profile = await profileService.GetProfileInfo(id);
            return Ok(profile);
        }
        [Authorize]
        [HttpPost("editProfile")]
        public async Task<IActionResult> EditProfile([FromForm]ProfileDto profileDto)
        {
            if (!int.TryParse(User.Claims.First(c => c.Type == "Id").Value, out int id))
                return BadRequest("Korisnik sa tim Id ne postoji");

            string res = await profileService.EditProfile(id, profileDto);
            return Ok(res);
        }

        [Authorize]
        [HttpGet("getAllOrders")]
        public async Task<IActionResult> GetAllOrders()
        {
            List<OrderDto> orders = await profileService.GetAllOrders();
            return Ok(orders);
        }

        [Authorize]
        [HttpGet("getSellers")]
        public async Task<IActionResult> GetSellres() {

            return Ok(profileService.GetSellers());
        }

    }
}
