using Microsoft.AspNetCore.Identity;

namespace api.Models
{
    public class AppUser : IdentityUser            // : IdentityUser (= Inherits IdentityUser, which already have the groundvalues of Id, Email and UserName) Other values are added.
    {
        public string? FirstName { get; set; }     // ? Allows null value upon registration/No need to enter these specific values on registration for smoother reg.process. Manually be updated later :)
        public string? LastName { get; set; }
        public string? AvatarUrl { get; set; }
        public List<Portfolio> Portfolios { get; set; } = [];
    }
}