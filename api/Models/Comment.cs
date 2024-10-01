
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models
{
    [Table("Comments")] // Only for aesthetic purpose, not really needed the tables are autonamed in the database anyway
    public class Comment
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;
        public DateTime CreatedOn { get; set; } = DateTime.Now; // Whenever a new comment is created, it will have the current date and time


        // Foreign Key # Links together the Stock to the Comment table - 1 to Many relationship
        public int? StockId { get; set; }
        public Stock? Stock { get; set; }
        public string AppUserId { get; set; }
        public AppUser AppUser { get; set; }
        // ---------------------------------------------
    }
}