using System;
using System.Net;
using FluentAssertions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using PizzaAPI.Controllers;
using PizzaAPI.Data.Repositories;

namespace PizzaAPI.Tests.Controllers
{
    [TestClass]
    public class TimeControllerTest
    {
        private TimeController _controller;
        private Mock<ITimeRepository> _timeRepoMock;

        [TestInitialize]
        public void BeforeEach()
        {
            _timeRepoMock = new Mock<ITimeRepository>();
            
            _controller = new TimeController(_timeRepoMock.Object);
        }

        [TestClass]
        public class GetTimeTest : TimeControllerTest
        {
            private DateTime _expectedDateTime;

            public void BeforeEachGetTime()
            {
                _expectedDateTime = new Bogus.DataSets.Date().Soon();

                _timeRepoMock.Setup(time => time.GetTime()).Returns(_expectedDateTime);
            }

            [TestMethod]
            public void ShouldReturnOkStatusCode()
            {
                var result = _controller.Get();
                var okResult = result as OkObjectResult;

                okResult.Should().NotBeNull();
                okResult?.StatusCode.Should().Be((int)HttpStatusCode.OK);
            }

            [TestMethod]
            public void ShouldReturnTimeResultAsResponseValue()
            {
                var result = _controller.Get();
                var okResult = result as OkObjectResult;

                okResult.Should().NotBeNull();
                okResult?.Value.Should().Be(_expectedDateTime);
            }
        }
    }
}
