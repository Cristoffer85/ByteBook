using Microsoft.AspNetCore.Mvc;
using api.Interfaces;
using Microsoft.AspNetCore.Authorization;
using api.Dtos.Account;

namespace api.Controllers
{
    [Route("api/profile")]
    [ApiController]
    public class UserProfileController(IUserProfileRepository userProfileRepo) : ControllerBase
    {
        private readonly IUserProfileRepository _userProfileRepo = userProfileRepo;

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
    
        [HttpPost("{userName}/avatar")]
        [Authorize]
        public async Task<IActionResult> UploadAvatar(string userName, IFormFile avatar)
        {
            if (avatar == null || avatar.Length == 0)
                return BadRequest("No file uploaded.");

            var avatarUrl = await _userProfileRepo.UploadAvatarAsync(userName, avatar);
            if (avatarUrl == null) return NotFound();

            return Ok(new { AvatarUrl = avatarUrl });
        }
    }
}