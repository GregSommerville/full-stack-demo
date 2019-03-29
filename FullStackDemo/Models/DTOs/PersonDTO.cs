namespace FullStackDemo.Models.DTOs
{
    // The Data Transfer Object that actually goes to/from the front end
    public class PersonDTO
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Address { get; set; }
        public int? Age { get; set; }
        public string Interests { get; set; }
        public string PortraitURL { get; set; }
    }
}