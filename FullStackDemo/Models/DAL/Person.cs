using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FullStackDemo.Models.DAL
{
    [Table("People")]
    public class Person
    {
        public int PersonId { get; set; }

        [Required]
        public string FirstName { get; set; }

        [Required]
        public string LastName { get; set; }

        public string Address { get; set; }

        public int? Age { get; set; }

        public string Interests { get; set; }

        public string PortraitURL { get; set; }
    }
}