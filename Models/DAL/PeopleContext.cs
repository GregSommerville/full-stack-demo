using System.Data.Entity;

namespace FullStackDemo.Models.DAL
{
    public partial class PeopleContext : DbContext
    {
        public DbSet<Person> People { get; set; }

        public PeopleContext() : base()
        {
            Database.SetInitializer<PeopleContext>(new DBInitializer());
        }
    }
}