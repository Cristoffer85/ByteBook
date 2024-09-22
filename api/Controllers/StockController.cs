using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Stock;
using api.Interfaces;
using api.Mappers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [Route("api/stock")]
    [ApiController]
    public class StockController : ControllerBase
    {
        private readonly ApplicationDBContext _context; // Makes the stock readonly, so that it cannot be muted
        private readonly IStockRepository _stockRepo; // Makes the stock readonly, so that it cannot be muted
        public StockController(ApplicationDBContext context, IStockRepository stockRepo)
        {
            _stockRepo = stockRepo;
            _context = context;
        }

        [HttpGet]           // GetAll
        public async Task<IActionResult> GetAll() 
        
        // Async = Send the request to the database and wait for response, When await entered the async is used 
        // (= Need eggs for cooking, go to the store and wait for the eggs then continue cooking) Asynchronous is used for speeding up processes of fetching data from etc databases or servers far far away
        {
            var stocks = await _stockRepo.GetAllAsync();           // ToList() is a method that converts the data into a list
            
            var stockDto = stocks.Select(s => s.ToStockDto());          // Select() is a method that selects the stock and maps it to the dto
            
            return Ok(stocks);
        }

        [HttpGet("{id}")]   // GetById
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            var stock = await _context.Stocks.FindAsync(id); // Find() is a method that finds the stock by the id

            if (stock == null)
            {
                return NotFound();
            }

            return Ok(stock.ToStockDto());
        }

        [HttpPost]          // Create
        public async Task<IActionResult> Create([FromBody] CreateStockRequestDto stockDto)
        {
            var stockModel = stockDto.ToStockFromCreateDto();   // Maps the stock dto to the model
            await _context.Stocks.AddAsync(stockModel);                    // Adds the stock model to the context, starts tracking the entity
            await _context.SaveChangesAsync();                             // Saves the changes to the context, commits the transaction
            return CreatedAtAction(nameof(GetById), new { id = stockModel.Id }, stockModel.ToStockDto());
        }

        [HttpPut]           // Update
        [Route("{id}")] // Route needed here, because..? Why not just [HttpPut("{id}")]? //
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateStockRequestDto updateDto)
        {
            var stockModel = await _context.Stocks.FirstOrDefaultAsync(x => x.Id == id);

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

            await _context.SaveChangesAsync();

            return Ok(stockModel.ToStockDto());
        }

        [HttpDelete]        // Delete
        [Route("{id}")] // Same question here as PUT method //
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            var stockModel = await _context.Stocks.FirstOrDefaultAsync(x => x.Id == id);

            if (stockModel == null)
            {
                return NotFound();
            }

            _context.Stocks.Remove(stockModel);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}