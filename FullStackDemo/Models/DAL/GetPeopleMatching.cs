using System.Collections.Generic;
using System.Linq;

namespace FullStackDemo.Models.DAL
{
    // instead of a repository class that includes everything (a problem, when the application gets big),
    // this approach adds partial methods to the context, keeping each request separate and small
    public partial class PeopleContext
    {
        public List<Person> GetPeopleMatching(string pattern)
        {
            return People
                .Where(p => 
                    p.FirstName.Contains(pattern) || 
                    p.LastName.Contains(pattern))
                .ToList();
        }
    }
}