using api.Dtos.Stock;
using api.Interfaces;
using api.Mappers;
using api.Models;
using Newtonsoft.Json;

namespace api.Repository
{
    public class FMPService(HttpClient httpClient, IConfiguration config) : IMFPService     // Class for FMP API service
    {
        private HttpClient _httpClient = httpClient;
        private IConfiguration _config = config;

        public async Task<Stock> FindStockBySymbolAsync(string symbol)
        {
            try {
                var result = await _httpClient.GetAsync($"https://financialmodelingprep.com/api/v3/profile/{symbol}?apikey={_config["FMPKey"]}");
                if (result.IsSuccessStatusCode)
                {
                    var content = await result.Content.ReadAsStringAsync();
                    var tasks = JsonConvert.DeserializeObject<FMPStock[]>(content);
                    var stock = tasks[0];
                    if(stock != null)
                    {
                        return stock.ToStockFromFMP();
                    }
                    return null;
                }
            } catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
            return null;
        }
    }
}