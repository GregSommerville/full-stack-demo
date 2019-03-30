using FullStackDemo.Models.DAL;
using System.Threading.Tasks;

namespace FullStackDemo.Models.RequestHandlers
{
    public class PeopleCountRequests
    {
        // simple GET returns the number of people in the DB
        public async static Task<int> GetNumberOfPeopleAsync()
        {
            using (var context = new PeopleContext())
            {
                var num = await context.GetNumberOfPeopleAsync();
                return num;
            }
        }
    }
}