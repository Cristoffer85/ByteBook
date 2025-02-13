namespace api.Dtos.Account
{
    public class UserProfileDto
    {
        public string Id { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string FavouritePet { get; set; }
        public string AvatarUrl { get; set; }
    }
}