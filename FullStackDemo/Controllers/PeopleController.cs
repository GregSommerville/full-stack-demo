using FullStackDemo.Models.DTOs;
using FullStackDemo.Models.RequestHandlers;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using System.Web.Http;

namespace FullStackDemo.Controllers
{
    public class PeopleController : ApiController
    {
        [HttpGet]
        public async Task<int> Get()
        {
            int numPeople = await PeopleRequests.GetNumberOfPeopleAsync();
            return numPeople;
        }

        [HttpGet]
        public async Task<List<PersonDTO>> Get(string pattern)
        {
            var people = await PeopleRequests.GetPeopleMatchingAsync(pattern);
            return people;
        }

        [HttpPost]
        public async Task<string> Post([FromBody]PersonDTO person)
        {
            var result = await PeopleRequests.AddPersonAsync(person);
            return result;
        }

        [HttpPut]
        public void Put(int id, [FromBody]string value)
        {
            throw new HttpResponseException(HttpStatusCode.BadRequest);
        }

        [HttpDelete]
        public void Delete(int id)
        {
            throw new HttpResponseException(HttpStatusCode.BadRequest);
        }
    }
}
