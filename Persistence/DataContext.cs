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

        // Tables
        public DbSet<Activity> Activities { get; set; }
        public DbSet<ActivityAttendee> ActivityAttendees { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            // This will call the base class method and then we can add our own customizations
            base.OnModelCreating(builder);

            // This will create a composite key for the ActivityAttendee table
            // Composite key is a key that consists of more than one attribute (appUserId and activityId in this case)
            builder.Entity<ActivityAttendee>(x => x.HasKey(aa => new { aa.AppUserId, aa.ActivityId }));

            // BELOW ARE THE RELATIONSHIPS BETWEEN THE TABLES - ENTITY FRAMEWORK CORE WILL CREATE THE RELATIONSHIPS IN THE DATABASE
            // WHICH IS MANY TO MANY RELATIONSHIP BETWEEN THE ACTIVITY AND APPUSER TABLES
            // (Many AppUsers can attend many Activities and many Activities can have many AppUsers attending them)

            // This will create a relationship between the AppUser and ActivityAttendee tables
            builder.Entity<ActivityAttendee>()
                .HasOne(u => u.AppUser)
                .WithMany(a => a.Activities)
                .HasForeignKey(aa => aa.AppUserId);

            // This will create a relationship between the Activity and ActivityAttendee tables
            builder.Entity<ActivityAttendee>()
                .HasOne(a => a.Activity)
                .WithMany(u => u.Attendees)
                .HasForeignKey(aa => aa.ActivityId);
        }
    }
}
