using System.Linq;

using System.Collections.Generic;

using Microsoft.AspNetCore.Mvc;
using PizzaAPI.Data.Models;
using Microsoft.AspNetCore.Mvc;
using PizzaAPI.Data.Repositories;

namespace PizzaAPI.Controllers
{
    [ApiController]
    [Produces("application/json")]
    public class PizzaController : ControllerBase
    {
        [Route("pizzas")]
        public ActionResult<List<Pizza>> Pizza_GetAll()
        {

        }

        [Route("pizza/{pizzaid}")]
        public ActionResult<Pizza> Pizza_Get(short pizzaid)
        {

        }

    }
}
