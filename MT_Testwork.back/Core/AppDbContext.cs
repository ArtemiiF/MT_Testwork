using Microsoft.EntityFrameworkCore;
using MT_Testwork.back.Models;

namespace MT_Testwork.back.Core
{
    public class AppDbContext : DbContext
    {
        public DbSet<Employee> Employees { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) 
        {
            Database.EnsureCreated();
        }
    }
}
