using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models
{
    [Table("Stocks")] // Only for aesthetic purpose, not really needed the tables are autonamed in the database anyway
    public class Stock
    {
        public int Id { get; set; }
        public string Symbol { get; set; } = string.Empty; //string.Empty to avoid nullReference error
        public string CompanyName { get; set; } = string.Empty;
        [Column(TypeName = "decimal(18,2)")]
        public decimal Purchase { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal LastDiv { get; set; }
        public string Industry { get; set; } = string.Empty;
        public long MarketCap { get; set; }


        // Primary Key # Links together the Stock to the Comment table - 1 to Many relationship
        public List<Comment> Comments { get; set; } = [];
        public List<Portfolio> Portfolios { get; set; } = [];
    }
}