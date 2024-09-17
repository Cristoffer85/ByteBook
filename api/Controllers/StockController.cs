using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Stock;
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

        [HttpGet] // GetAll
        public IActionResult GetAll()
        {
            var stocks = _context.Stocks.ToList() // ToList() is a method that converts the data into a list
            .Select(s => s.ToStockDto());         // Select() is a method that selects the stock and maps it to the dto
            return Ok(stocks);
        }

        [HttpGet("{id}")] // GetById
        public IActionResult GetById([FromRoute] int id)
        {
            var stock = _context.Stocks.Find(id); // Find() is a method that finds the stock by the id

            if (stock == null)
            {
                return NotFound();
            }

            return Ok(stock.ToStockDto());
        }

        [HttpPost] // Create
        public IActionResult Create([FromBody] CreateStockRequestDto stockDto)
        {
            var stockModel = stockDto.ToStockFromCreateDto();   // Maps the stock dto to the model
            _context.Stocks.Add(stockModel);                    // Adds the stock model to the context, starts tracking the entity
            _context.SaveChanges();                             // Saves the changes to the context, commits the transaction
            return CreatedAtAction(nameof(GetById), new { id = stockModel.Id }, stockModel.ToStockDto());
        }

        [HttpPut] // Update
        [Route("{id}")] // Route needed here, because..? Why not just [HttpPut("{id}")]?
        public IActionResult Update([FromRoute] int id, [FromBody] UpdateStockRequestDto updateDto)
        {
            var stockModel = _context.Stocks.FirstOrDefault(x => x.Id == id);

            if (stockModel == null)
            {
                return NotFound();
            }

            stockModel.Symbol = updateDto.Symbol;
            stockModel.CompanyName = updateDto.CompanyName;
            stockModel.Purchase = updateDto.Purchase;
            stockModel.LastDiv = updateDto.LastDiv;
            stockModel.Industry = updateDto.Industry;
            stockModel.MarketCap = updateDto.MarketCap;

            _context.SaveChanges();

            return Ok(stockModel.ToStockDto());
        }
    }
}