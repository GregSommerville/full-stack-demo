using System.Linq;

namespace FullStackDemo.Models.DAL
{
    // instead of a repository class that includes everything (a problem, when the application gets big),
    // this approach adds partial methods to the context, keeping each request separate and small
    public partial class PeopleContext
    {
        public int GetNumberOfPeople()
        {
            return People.Count();
        }
    }
}