using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace Server.Controllers
{
    public class SearchController : Controller
    {
        HttpClient _client = new HttpClient();
        [HttpGet]
        [Route("/api/search/{method}/{query}")]
        public async Task<IActionResult> Values(string method, string query)
        {
            string json = null;
            if (method == "zip")
            {
                var result = await _client.GetAsync($"https://congress.api.sunlightfoundation.com/legislators/locate?zip={query}&per_page=all");
                json = await result.Content.ReadAsStringAsync();
            }
            else
            {
                var result = await _client.GetAsync($"https://congress.api.sunlightfoundation.com/legislators?query={query}&per_page=all");
                json = await result.Content.ReadAsStringAsync();
            }

            var definition = new
            {
                results = Enumerable.Empty<dynamic>()
            };

            var response = JsonConvert.DeserializeAnonymousType(json, definition);

            return Ok(response.results.Select(r => new
            {
                Id = r.crp_id,
                Name = $"{r.first_name} {r.last_name}"
            }));
        }
    }
}
