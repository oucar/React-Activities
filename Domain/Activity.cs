

namespace Domain
{
    public class Activity
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public DateTime Date { get; set; }
        public string Description { get; set; } 
        public string Category { get; set; }
        public string State { get; set; }
        public string  City { get; set; }   
        public string Venue { get; set; }
        // Each avtivity has a list of attendees
        // Initialize the list to avoid null reference exceptions
        public ICollection<ActivityAttendee> Attendees { get; set; } = new List<ActivityAttendee>();
    }
}
