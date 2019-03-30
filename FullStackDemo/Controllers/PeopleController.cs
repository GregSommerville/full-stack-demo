using FullStackDemo.Models.DTOs;
using FullStackDemo.Models.RequestHandlers;
using System.Threading.Tasks;
using System.Web.Http;

namespace FullStackDemo.Controllers
{
    public class PeopleController : ApiController
    {
        public async Task<IHttpActionResult> Get(string pattern)
        {
            var people = await PeopleRequests.GetPeopleMatchingAsync(pattern);
            return Ok(people);
        }

        public async Task<IHttpActionResult> Post([FromBody]PersonDTO person)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await PeopleRequests.AddPersonAsync(person);
            return Ok(result);
        }
    }
}