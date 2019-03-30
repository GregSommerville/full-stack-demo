using FullStackDemo.Models.RequestHandlers;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Threading.Tasks;

namespace FullStackDemo.Tests
{
    [TestClass]
    public class PeopleCountTests
    {
        [TestMethod]
        public async Task NonZeroCount()
        {
            // retrieve a known person
            var count = await PeopleCountRequests.GetNumberOfPeopleAsync();
            Assert.AreNotEqual(0, count);
        }
    }
}
