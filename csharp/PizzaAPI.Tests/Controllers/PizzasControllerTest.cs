using FluentAssertions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using PizzaAPI.Controllers;

namespace PizzaAPI.Tests.Controllers
{
    [TestClass]
    public class PizzasControllerTest
    {
        private PizzasController _controller;
        
        [TestInitialize]
        public void BeforeEach()
        {
            _controller = new PizzasController();
        }

        [TestMethod]
        public void ShouldReturnHelloWorldInOkStatusWhenGetPizzasCalled()
        {
            var result = _controller.Get();
            var okObjectResult = result as OkObjectResult;

            okObjectResult.Should().NotBeNull();
            okObjectResult?.Value.Should().Be("Hello World!");
        }
    }
}
