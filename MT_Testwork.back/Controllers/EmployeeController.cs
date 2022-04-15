using Microsoft.AspNetCore.Mvc;
using MT_Testwork.back.Core;
using MT_Testwork.back.Models;

namespace MT_Testwork.back.Controllers
{
    [ApiController]
    [Route("api/employees")]
    public class EmployeeController : Controller
    {
        AppDbContext db;

        public EmployeeController(AppDbContext context)
        {
            db = context;
            if (!db.Employees.Any())
            {
                db.Employees.Add(new Employee
                {
                    Department = "Счастье",
                    Fullname = "Васильев Иван Иванович",
                    Salary = 90000.0m,
                    DateOfBirth = new DateTime(1991, 10, 10),
                    DateOfWorkStart = new DateTime(2010, 5, 6)
                });

                db.Employees.Add(new Employee
                {
                    Department = "Радость",
                    Fullname = "Карпова Анастасия Петровна",
                    Salary = 75000.0m,
                    DateOfBirth = new DateTime(2001, 10, 15),
                    DateOfWorkStart = new DateTime(2019, 7, 8)
                });

                db.Employees.Add(new Employee
                {
                    Department = "Мир",
                    Fullname = "Тарасов Евгений Анатольевич",
                    Salary = 60000.0m,
                    DateOfBirth = new DateTime(2002, 7, 2),
                    DateOfWorkStart = new DateTime(2022, 1, 25)
                });

                db.SaveChanges();
            }
        }

        [HttpGet]
        public IEnumerable<Employee> Get()
        {
            Console.WriteLine("Get all employees init");
            return db.Employees.ToList();
        }

        [HttpPost]
        public IActionResult Post(Employee employee)
        {
            if (ModelState.IsValid)
            {
                db.Employees.Add(employee);
                db.SaveChanges();
                return Ok();
            }
            return BadRequest(ModelState);
        }

        [HttpPut]
        public IActionResult Put(Employee employee)
        {
            Console.WriteLine("Put init");

            if (ModelState.IsValid)
            {
                db.Update(employee);
                db.SaveChanges();
                return Ok(employee);
            }
            return BadRequest(ModelState);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            Employee product = db.Employees.FirstOrDefault(x => x.Id == id);
            if (product != null)
            {
                db.Employees.Remove(product);
                db.SaveChanges();
                return Ok();
            }
            return NotFound();
        }

    }
}
