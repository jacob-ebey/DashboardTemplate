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
                    Id = "N00003389",
                    Title = "Mitch McConnell (R)"
                },
                new
                {
                    Id = "N00007360",
                    Title = "Nancy Pelosi (D)"
                },
            });
        }

        [HttpGet]
        [Route("/api/test/{id}")]
        public IActionResult Value(string id)
        {
            return Ok(new
            {
                Id = id,
                Nodes = new object[]
                {
                    new { Id = 1, Label = "Node 1" },
                    new { Id = 2, Label = "Node 2" },
                    new { Id = 3, Label = "Node 3" },
                    new { Id = 4, Label = "Node 4" },
                    new { Id = 5, Label = "Node 5" },
                },
                Edges = new object[]
                {
                    new { From = 1, To = 2 },
                    new { From = 1, To = 3 },
                    new { From = 2, To = 4 },
                    new { From = 2, To = 5 },
                }
            });
        }
    }
}
