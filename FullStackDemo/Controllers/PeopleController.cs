using FullStackDemo.Models.DTOs;
using FullStackDemo.Models.RequestHandlers;
using System.Collections.Generic;
using System.Net;
using System.Web.Http;

namespace FullStackDemo.Controllers
{
    public class PeopleController : ApiController
    {
        [HttpGet]
        public int Get()
        {
            return PeopleRequests.GetNumberOfPeople();
        }

        [HttpGet]
        public List<PersonDTO> Get(string pattern)
        {
            return PeopleRequests.GetPeopleMatching(pattern);
        }

        [HttpPost]
        public void Post([FromBody]string value)
        {
            throw new HttpResponseException(HttpStatusCode.BadRequest);
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
