using Microsoft.AspNetCore.Mvc;
using System;

namespace Server.Controllers
{
    public class TestController : Controller
    {
        [HttpGet]
        [Route("/api/test")]
        public IActionResult Values()
        {
            return Ok(new object[]
            {
                new
                {
                    Id = Guid.NewGuid().ToString(),
                    Title = "Test Item 1"
                },
                new
                {
                    Id = Guid.NewGuid().ToString(),
                    Title = "Test Item 2"
                },
            });
        }
    }
}
