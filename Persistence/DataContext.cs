using Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace Persistence
{
    // IdentityDbContext<AppUser> is the class that will give us access to the Identity tables in our database
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions options) : base(options)
        {
            // Database.EnsureCreated();
        }

        // Table 
        public DbSet<Activity> Activities { get; set; }

    }
}
