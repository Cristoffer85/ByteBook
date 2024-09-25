using System.ComponentModel.DataAnnotations;

namespace api.Dtos.Stock
{
    public class CreateStockRequestDto
    {
        [Required]                                          // Required to have a value
        [MaxLength(10, ErrorMessage = "Symbol cannot be over 10 characters long")]
        public string Symbol { get; set; } = string.Empty;  //string.Empty to avoid nullReference error
        [Required]                                          // Required to have a value
        [MaxLength(20, ErrorMessage = "Company name cannot be over 20 characters long")]
        public string CompanyName { get; set; } = string.Empty;
        [Required]                                          // Required to have a value
        [Range(1, 1000000000, ErrorMessage = "Purchase price must be between 1 and 1000000000")]
        public decimal Purchase { get; set; }
        [Required]                                          // Required to have a value
        [Range(0.001, 100, ErrorMessage = "Current price must be between 0.001 and 100")]
        public decimal LastDiv { get; set; }
        [Required]                                          // Required to have a value
        [MaxLength(10, ErrorMessage = "Industry cannot be over 10 characters long")]
        public string Industry { get; set; } = string.Empty;
        [Required]                                          // Required to have a value
        [Range(1, 5000000000, ErrorMessage = "Market cap must be between 1 and 5000000000")]
        public long MarketCap { get; set; }
    }
}