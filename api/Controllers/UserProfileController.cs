using Microsoft.AspNetCore.Mvc;
using api.Interfaces;
using Microsoft.AspNetCore.Authorization;
using System.Threading.Tasks;
using api.Dtos.Account;

namespace api.Controllers
{
    [Route("api/profile")]
    [ApiController]
    public class UserProfileController : ControllerBase
    {
        private readonly IUserProfileRepository _userProfileRepo;

        public UserProfileController(IUserProfileRepository userProfileRepo)
        {
            _userProfileRepo = userProfileRepo;
        }

        [HttpGet]
        [Authorize(Policy = "AdminOnly")]
        public async Task<IActionResult> GetAll()
        {
            var userProfiles = await _userProfileRepo.GetAllAsync();
            return Ok(userProfiles);
        }

        [HttpGet("{userName}")]
        [Authorize]
        public async Task<IActionResult> GetByUserName(string userName)
        {
            var userProfile = await _userProfileRepo.GetByUserNameAsync(userName);
            if (userProfile == null) return NotFound();
            return Ok(userProfile);
        }

        [HttpPut("{userName}")]
        [Authorize]
        public async Task<IActionResult> Update(string userName, UserProfileDto userProfileDto)
        {
            if (userName != userProfileDto.UserName) return BadRequest();

            var updatedUserProfile = await _userProfileRepo.UpdateAsync(userProfileDto);
            if (updatedUserProfile == null) return NotFound();
            return Ok(updatedUserProfile);
        }

        [HttpDelete("{userName}")]
        [Authorize(Policy = "AdminOnly")]
        public async Task<IActionResult> Delete(string userName)
        {
            var result = await _userProfileRepo.DeleteAsync(userName);
            if (!result) return NotFound();
            return NoContent();
        }
    }
}