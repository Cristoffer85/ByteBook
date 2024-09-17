using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Mappers;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/stock")]
    [ApiController]
    public class StockController : ControllerBase
    {
        private readonly ApplicationDBContext _context; // Makes the stock readonly, so that it cannot be muted
        public StockController(ApplicationDBContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var stocks = _context.Stocks.ToList() // ToList() is a method that converts the data into a list
            .Select(s => s.ToStockDto());         // Select() is a method that selects the stock and maps it to the dto
            return Ok(stocks);
        }

        [HttpGet("{id}")]
        public IActionResult GetById([FromRoute] int id)
        {
            var stock = _context.Stocks.Find(id); // Find() is a method that finds the stock by the id

            if (stock == null)
            {
                return NotFound();
            }

            return Ok(stock.ToStockDto());
        }
    }
}