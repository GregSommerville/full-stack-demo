using FullStackDemo.Models.DAL;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Threading.Tasks;

namespace FullStackDemo.Tests
{
    [TestClass]
    public class PeopleGetTests
    {
        [TestMethod]
        public async Task DontFindPerson()
        {
            using (var context = new PeopleContext())
            {
                var people = await context.GetPeopleMatchingAsync("zzzzzzz");
                Assert.IsTrue(people.Count == 0);
            }            
        }

        [TestMethod]
        public async Task FindKnownPerson()
        {
            using (var context = new PeopleContext())
            {
                var people = await context.GetPeopleMatchingAsync("washington");
                Assert.IsTrue(people.Count == 1);
            }
        }
    }
}
