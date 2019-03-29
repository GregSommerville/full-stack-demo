using FullStackDemo.Models.DAL;
using FullStackDemo.Models.DTOs;
using System;
using System.Collections.Generic;

namespace FullStackDemo.Models.RequestHandlers
{
    // Business Logic, one class per controller
    public class PeopleRequests
    {
        // simple GET returns the number of people in the DB
        public static int GetNumberOfPeople()
        {
            using (var context = new PeopleContext())
                return context.GetNumberOfPeople();
        }

        // GET with a string returns all people that match that in first or last name
        public static List<PersonDTO> GetPeopleMatching(string pattern)
        {
            using (var context = new PeopleContext())
            {
                // the database entities that match
                var people = context.GetPeopleMatching(pattern);

                // convert to list of DTOs via Automapper
                return null;
            }
        }

        // POST with a new user
        public static bool AddPerson(PersonDTO dto)
        {
            throw new NotImplementedException();
        }
        
    }
}