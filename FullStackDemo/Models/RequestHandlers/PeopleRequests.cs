using FullStackDemo.Models.DAL;
using FullStackDemo.Models.DTOs;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FullStackDemo.Models.RequestHandlers
{
    // Business Logic, one class per controller
    public class PeopleRequests
    {
        // GET with a string returns all people that match that in first or last name
        public async static Task<List<PersonDTO>> GetPeopleMatchingAsync(string pattern)
        {
            using (var context = new PeopleContext())
            {
                var people = await context.GetPeopleMatchingAsync(pattern);
                var peopleDTOs = AutoMapper.Mapper.Map<List<PersonDTO>>(people);
                return peopleDTOs;
            }
        }

        // POST with a new person
        public async static Task<string> AddPersonAsync(PersonDTO dto)
        {
            using (var context = new PeopleContext())
            {
                var person = AutoMapper.Mapper.Map<Person>(dto);
                if (person != null)
                {
                    context.AddPerson(person);
                    await context.SaveChangesAsync();
                }
                return "";
            }
        }        
    }
}