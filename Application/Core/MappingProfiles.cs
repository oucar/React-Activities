using Application.Activities;
using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            // For Edit, we were manually setting currentActivity to a request.Activity
            // currentActivity.Title = request.Activity.Title ?? currentActivity.Title;
            // But now, no need to use the chunky piece of code above for each attribute of an Activity.
            CreateMap<Activity, Activity>();

            // It's saying that the HostUsername property of ActivityDto should be populated with the UserName of the 
            // AppUser of the first Attendee in the Attendees collection of the Activity instance where IsHost is true.
             // In other words, it's getting the username of the host of the activity.
            CreateMap<Activity, ActivityDto>()
                .ForMember(d => d.HostUsername, o => o.MapFrom(s => s.Attendees
                    .FirstOrDefault(x => x.IsHost).AppUser.UserName));

              CreateMap<ActivityAttendee, Profiles.Profile>()
                .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.AppUser.DisplayName))
                .ForMember(d => d.Username, o => o.MapFrom(s => s.AppUser.UserName))
                .ForMember(d => d.Bio, o => o.MapFrom(s => s.AppUser.Bio));

         
        }
    }
}
