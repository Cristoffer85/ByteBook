using api.Models;
using Microsoft.AspNetCore.Identity;

namespace api.Data
{
    public static class GenerateAdmin
    {
        public static async Task SeedAdminUser(IServiceProvider serviceProvider)
        {
            var userManager = serviceProvider.GetRequiredService<UserManager<AppUser>>();
            var roleManager = serviceProvider.GetRequiredService<RoleManager<IdentityRole>>();

            // Ensure the admin role exists
            if (!await roleManager.RoleExistsAsync("Admin"))
            {
                await roleManager.CreateAsync(new IdentityRole("Admin"));
            }

            // Check if the admin user already exists
            var adminUser = await userManager.FindByNameAsync("admin");
            if (adminUser == null)
            {
                // Create the admin user
                adminUser = new AppUser
                {
                    UserName = "admin",
                    Email = "admin@example.com",
                    FirstName = "Admin",
                    LastName = "User",
                    EmailConfirmed = true
                };

                var result = await userManager.CreateAsync(adminUser, "AdminPassword123!");

                if (result.Succeeded)
                {
                    // Assign the admin role to the user
                    await userManager.AddToRoleAsync(adminUser, "Admin");
                }
            }
        }
    }
}