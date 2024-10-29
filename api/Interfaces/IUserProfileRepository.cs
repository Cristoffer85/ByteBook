using api.Dtos.Account;

namespace api.Interfaces
{
    public interface IUserProfileRepository
    {
        Task<IEnumerable<UserProfileDto>> GetAllAsync();
        Task<UserProfileDto> GetByUserNameAsync(string userName);
        Task<UserProfileDto> UpdateAsync(UserProfileDto userProfileDto);
        Task<bool> DeleteAsync(string userName);
        Task<string> UploadAvatarAsync(string userName, IFormFile avatar);
    }
}