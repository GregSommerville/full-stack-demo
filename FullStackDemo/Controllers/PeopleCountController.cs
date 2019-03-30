using FullStackDemo.Models.RequestHandlers;
using System.Threading.Tasks;
using System.Web.Http;

namespace FullStackDemo.Controllers
{
    public class PeopleCountController : ApiController
    {
        [HttpGet]
        public async Task<IHttpActionResult> Get()
        {
            int numPeople = await PeopleCountRequests.GetNumberOfPeopleAsync();
            return Ok(numPeople);
        }
    }
}
