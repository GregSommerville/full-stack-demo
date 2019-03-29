namespace FullStackDemo.Models.DAL
{
    public partial class PeopleContext
    {
        public void AddPerson(Person person)
        {
            People.Add(person);
        }
    }
}