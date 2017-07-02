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
    public class ContribController : Controller
    {
        HttpClient _client = new HttpClient();
        [HttpGet]
        [Route("/api/contrib/{id}")]
        public async Task<IActionResult> Values(string id)
        {
            var result = await _client.GetAsync($"https://www.opensecrets.org/api/?method=candContrib&cid={id}&cycle=2016&output=json&apikey=5ac0e80b3e7af8e68ddc0164e4534a23");
            var json = await result.Content.ReadAsStringAsync();

            var definition = new
            {
                response = new
                {
                    contributors = new JObject()
                }
            };

            var response = JsonConvert.DeserializeAnonymousType(json, definition);
            var attributes = response.response.contributors.Value<dynamic>("@attributes");
            var contributors = response.response.contributors.Value<IEnumerable<dynamic>>("contributor");

            var nodes = new dynamic[]
            {
                new { Id = 1, Label = attributes.cand_name },
            }
            .Concat(
                contributors.Select((t, i) =>
                   new { Id = i + 2, Label = t["@attributes"].org_name, total = double.Parse((string)t["@attributes"].total) }
                )
            );

            var edges = nodes.Skip(1).Select(o => new { From = o.Id, To = 1, label = string.Format("{0:C}", o.total), shape = "box" });

            return Ok(new
            {
                Id = attributes.cid,
                Name = attributes.cand_name,
                Total = string.Format("{0:C}", nodes.Skip(1).Sum(n => (double)n.total)),
                Cycle = attributes.cycle,
                Origin = attributes.origin,
                Notice = attributes.notice,
                Source = attributes.source,
                Nodes = nodes,
                Edges = edges
            });
        }
    }
}
