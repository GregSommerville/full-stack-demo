using System.ComponentModel.DataAnnotations;

namespace FullStackDemo.Models.DTOs
{
    // The Data Transfer Object that actually goes to/from the front end
    public class PersonDTO
    {
        [Required]
        [StringLength(25)]
        public string FirstName { get; set; }

        [Required]
        [StringLength(25)]
        public string LastName { get; set; }

        [StringLength(100)]
        public string Address { get; set; }

        [Range(1, 100)]
        public int? Age { get; set; }

        [StringLength(1000)]
        public string Interests { get; set; }

        [StringLength(200)]
        public string PortraitURL { get; set; }
    }
}