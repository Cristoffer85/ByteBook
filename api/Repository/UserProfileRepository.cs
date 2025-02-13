using api.Dtos.Account;
using api.Interfaces;
using api.Data;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class UserProfileRepository(ApplicationDBContext context) : IUserProfileRepository
    {
        private readonly ApplicationDBContext _context = context;

        public async Task<IEnumerable<UserProfileDto>> GetAllAsync()
        {
            return await _context.Users
                .Select(u => new UserProfileDto
                {
                    Id = u.Id,
                    UserName = u.UserName,
                    Email = u.Email,
                    FirstName = u.FirstName,
                    LastName = u.LastName,
                    FavouritePet = u.FavouritePet,
                    AvatarUrl = u.AvatarUrl
                }).ToListAsync();
        }

        public async Task<UserProfileDto> GetByUserNameAsync(string userName)
        {
            var user = await _context.Users.SingleOrDefaultAsync(u => u.UserName == userName);
            if (user == null) return null;

            return new UserProfileDto
            {
                Id = user.Id,
                UserName = user.UserName,
                Email = user.Email,
                FirstName = user.FirstName,
                LastName = user.LastName,
                FavouritePet = user.FavouritePet,
                AvatarUrl = user.AvatarUrl
            };
        }

        public async Task<UserProfileDto> UpdateAsync(UserProfileDto userProfileDto)
        {
            var user = await _context.Users.SingleOrDefaultAsync(u => u.UserName == userProfileDto.UserName);
            if (user == null) return null;

            user.UserName = userProfileDto.UserName;
            user.Email = userProfileDto.Email;
            user.FirstName = userProfileDto.FirstName;
            user.LastName = userProfileDto.LastName;
            user.FavouritePet = userProfileDto.FavouritePet;
            user.AvatarUrl = userProfileDto.AvatarUrl;

            await _context.SaveChangesAsync();
            return userProfileDto;
        }

        public async Task<bool> DeleteAsync(string userName)
        {
            var user = await _context.Users.SingleOrDefaultAsync(u => u.UserName == userName);
            if (user == null) return false;

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<string> UploadAvatarAsync(string userName, IFormFile avatar)
        {
            var user = await _context.Users.SingleOrDefaultAsync(u => u.UserName == userName);
            if (user == null) return null;

            var uploads = Path.Combine("wwwroot", "uploads");
            if (!Directory.Exists(uploads))
                Directory.CreateDirectory(uploads);

            var fileName = $"{Guid.NewGuid()}_{avatar.FileName}"; // Ensure unique file names
            var filePath = Path.Combine(uploads, fileName);
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await avatar.CopyToAsync(stream);
            }

            user.AvatarUrl = $"/uploads/{fileName}"; // Ensure the URL is correct
            await _context.SaveChangesAsync();

            return user.AvatarUrl;
        }
    }
}