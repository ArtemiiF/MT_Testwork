using System.ComponentModel.DataAnnotations;

namespace MT_Testwork.back.Models
{
    public class Employee
    {
        [Key]
        public int Id { get; set; }
        public string Department { get; set; } = string.Empty;
        public string Fullname { get; set; } = string.Empty;
        public DateTime DateOfBirth { get; set; }
        public DateTime DateOfWorkStart { get; set; }
        public decimal Salary { get; set; }
    }
}
