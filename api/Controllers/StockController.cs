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
    [Route("api/stock")]        // Defines the route for the controller
    [ApiController]             // Defines the controller as an API controller
    public class StockController : ControllerBase
    {
        private readonly ApplicationDBContext _context; // Makes the stock readonly, so that it cannot be muted
        private readonly IStockRepository _stockRepo;   // Makes the stock readonly, so that it cannot be muted
        public StockController(ApplicationDBContext context, IStockRepository stockRepo)
        {
            _stockRepo = stockRepo;
            _context = context;
        }

//-----------------
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
            var stock = await _stockRepo.GetByIdAsync(id);

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
            await _stockRepo.CreateAsync(stockModel);           // Creates the stock model
            return CreatedAtAction(nameof(GetById), new { id = stockModel.Id }, stockModel.ToStockDto());
        }

        [HttpPut]           // Update
        [Route("{id}")]     // Route needed here, because..? Why not just [HttpPut("{id}")]? //
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateStockRequestDto updateDto)
        {
            var stockModel = await _stockRepo.UpdateAsync(id, updateDto);

            if (stockModel == null)
            {
                return NotFound();
            }

            return Ok(stockModel.ToStockDto());
        }

        [HttpDelete]        // Delete
        [Route("{id}")]     // Same question here as PUT method //
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            var stockModel = await _stockRepo.DeleteAsync(id);

            if (stockModel == null)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}