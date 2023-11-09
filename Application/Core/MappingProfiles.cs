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
        }
    }
}