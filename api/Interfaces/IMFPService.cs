using api.Models;

namespace api.Interfaces
{
    public interface IMFPService
    {
        Task<Stock> FindStockBySymbolAsync(string symbol);   
    }
}