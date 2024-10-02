using Microsoft.AspNetCore.Mvc; // Imports of libraries existing in .NET
using api.Data;                 // Imports of folders existing in project
using api.Dtos.Stock;
using api.Helpers;
using api.Interfaces;
using api.Mappers;
using Microsoft.AspNetCore.Authorization;

namespace api.Controllers
{
    [Route("api/stock")]        // Defines the route for the controller
    [ApiController]             // Defines the controller as an API controller
    public class StockController(ApplicationDBContext context, IStockRepository stockRepo) : ControllerBase       // Primary Key controller, Stocks
    {
        private readonly ApplicationDBContext _context = context; // Makes the stock readonly, so that it cannot be muted
        private readonly IStockRepository _stockRepo = stockRepo;   // Makes the stock readonly, so that it cannot be muted
        
        //-----------------
        [HttpGet]               // GetAll
        [Authorize]
        public async Task<IActionResult> GetAll([FromQuery] QueryObject query) 
        
        // Async = Send the request to the database and wait for response, When await entered the async is used 
        // (= Need eggs for cooking, go to the store and wait for the eggs then continue cooking) Asynchronous is used for speeding up processes of fetching data from etc databases or servers far far away
        {
            if(!ModelState.IsValid)
                return BadRequest(ModelState);
                
            var stocks = await _stockRepo.GetAllAsync(query);           // ToList() is a method that converts the data into a list
            
            var stockDto = stocks.Select(s => s.ToStockDto()).ToList();          // Select() is a method that selects the stock and maps it to the dto
            
            return Ok(stockDto);
        }

        [HttpGet("{id:int}")]   // GetById
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            if(!ModelState.IsValid)
                return BadRequest(ModelState);
                
            var stock = await _stockRepo.GetByIdAsync(id);

            if (stock == null)
            {
                return NotFound();
            }

            return Ok(stock.ToStockDto());
        }

        [HttpPost]              // Create
        public async Task<IActionResult> Create([FromBody] CreateStockRequestDto stockDto)
        {
            if(!ModelState.IsValid)
                return BadRequest(ModelState);
                
            var stockModel = stockDto.ToStockFromCreateDto();   // Maps the stock dto to the model

            await _stockRepo.CreateAsync(stockModel);           // Creates the stock model

            return CreatedAtAction(nameof(GetById), new { id = stockModel.Id }, stockModel.ToStockDto());
        }

        [HttpPut]               // Update
        [Route("{id:int}")]     // Route needed here, because..? Why not just [HttpPut("{id}")]? //
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateStockRequestDto updateDto)
        {
            if(!ModelState.IsValid)
                return BadRequest(ModelState);
                
            var stockModel = await _stockRepo.UpdateAsync(id, updateDto);

            if (stockModel == null)
            {
                return NotFound();
            }

            return Ok(stockModel.ToStockDto());
        }

        [HttpDelete]            // Delete
        [Route("{id:int}")]     // Same question here as PUT method //
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            if(!ModelState.IsValid)
                return BadRequest(ModelState);
                
            var stockModel = await _stockRepo.DeleteAsync(id);

            if (stockModel == null)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}