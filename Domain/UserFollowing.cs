namespace Domain
{
    public class UserFollowing
    {
        // We always have observer following a target

        // Me as the user am the observer as I'm the one following someone
        // Person who is going to follow another user
        public string ObserverId { get; set; }
        public AppUser Observer { get; set; }

        // The person you are following is the Target
        // Person who is going to be followed
        public string TargetId { get; set; }
        public AppUser Target { get; set; }
    }
}