using Microsoft.AspNetCore.Mvc;
using PizzaAPI.Data.Repositories;

namespace PizzaAPI.Controllers
{
    [ApiController]
    [Produces("application/json")]
    [Route("time")]
    public class TimeController : ControllerBase
    {
        private readonly ITimeRepository _timeRepository;

        public TimeController(ITimeRepository timeRepository)
        {
            _timeRepository = timeRepository;
        }
        
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_timeRepository.GetTime());
        }
    }
}
