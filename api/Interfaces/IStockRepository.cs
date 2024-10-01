using api.Dtos.Stock;
using api.Helpers;
using api.Models;

namespace api.Interfaces
{
    public interface IStockRepository
    {
        Task<List<Stock>> GetAllAsync(QueryObject query);                   //The ? = FirstOrDefault CAN BE NULL
        Task<Stock?> GetByIdAsync(int id);                                  //The ? = FirstOrDefault CAN BE NULL
        Task<Stock?> GetBySymbolAsync(string symbol);                       //The ? = FirstOrDefault CAN BE NULL
        Task<Stock> CreateAsync(Stock stockModel);
        Task<Stock?> UpdateAsync(int id, UpdateStockRequestDto stockDto);   //The ? = FirstOrDefault CAN BE NULL
        Task<Stock?> DeleteAsync(int id);                                   //The ? = FirstOrDefault CAN BE NULL
        Task<bool> StockExists(int id);
    }
}