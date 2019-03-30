using FullStackDemo.Models.DAL;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace FullStackDemo.Tests
{
    [TestClass]
    public class PersonAddTests
    {
        [TestMethod]
        public void AddInvalid()
        {
            var newPerson = new Person()
            {
                FirstName = "Timothy"
            };

            using (var context = new PeopleContext())
            {
                try
                {
                    context.AddPerson(newPerson);
                    // should throw an exception
                    Assert.Fail();
                }
                catch
                {
                }
            }
        }

        [TestMethod]
        public void AddValid()
        {
            var newPerson = new Person()
            {
                FirstName = "John",
                LastName = "Kennedy"
            };

            using (var context = new PeopleContext())
            {
                try
                {
                    context.AddPerson(newPerson);
                }
                catch
                {
                    Assert.Fail();
                }
            }
        }
    }
}
