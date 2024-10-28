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
                    LastName = u.LastName
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
                LastName = user.LastName
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
    }
}