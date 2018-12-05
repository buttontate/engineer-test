using System;
using Microsoft.AspNetCore.Mvc;

namespace PizzaAPI.Controllers
{
    [ApiController]
    public class PizzasController : ControllerBase
    {
        [HttpGet("/pizzas")]
        public IActionResult Get()
        {
            return Ok("Hello World!");
        }

        [HttpGet("/pizzas/{id}")]
        public IActionResult Get(int id)
        {
            throw new NotImplementedException();
        }

        [HttpPost("/pizzas")]
        public IActionResult Post([FromBody] string value)
        {
            throw new NotImplementedException();
        }

        [HttpPut("/pizzas/{id}")]
        public IActionResult Put(int id, [FromBody] string value)
        {
            throw new NotImplementedException();
        }

        [HttpDelete("/pizzas/{id}")]
        public IActionResult Delete(int id)
        {
            throw new NotImplementedException();
        }
    }
}
