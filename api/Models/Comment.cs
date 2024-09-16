using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class Comment
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;
        public DateTime CreatedOn { get; set; } = DateTime.Now; // Whenever a new comment is created, it will have the current date and time


        // Foreign Key # Links together the Stock to the Comment table - 1 to Many relationship
        public int? StockId { get; set; }
        public Stock? Stock { get; set; }
        // ---------------------------------------------
    }
}