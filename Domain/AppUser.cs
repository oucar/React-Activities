using Microsoft.AspNetCore.Identity;

namespace Domain
{
	public class AppUser : IdentityUser
	{
		public string DisplayName { get; set; }
		public string Bio { get; set; }

		// Each user has a list of activities
		public ICollection<ActivityAttendee> Activities { get; set; }

	}
}

