using Domain;
using Microsoft.AspNetCore.Mvc;
using Application;
using Application.Activities;
using Microsoft.AspNetCore.Authorization;
using System.Threading.Tasks;
using System;

namespace API.Controllers
{
    public class ActivitiesController : BaseAppController
    {
        // GET api/activities
        // [FromQuery] is used to bind the query string parameters to the method parameters
        [HttpGet]
        public async Task<IActionResult> GetActivities([FromQuery] ActivityParams param)
        {
            var result = await Mediator.Send(new List.Query { Params = param });

            return HandlePagedResult(result);
        }

        // GET api/activities/${id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetSingleActivity(Guid id)
        {
            var result = await Mediator.Send(new Details.Query { Id = id });

            return HandleResult(result);
        }

        // POST api/activities/
        [HttpPost]
        public async Task<IActionResult> CreateActivity(Activity activity)
        {
            var result = await Mediator.Send(new Create.Command { Activity = activity });

            return HandleResult(result);
        }

        // api/activities/${id}
        [Authorize(Policy = "IsActivityHost")]
        [HttpPut("{id}")]
        public async Task<IActionResult> EditActivity(Guid id, Activity activity)
        {
            activity.Id = id;

            var result = await Mediator.Send(new Edit.Command { Activity = activity });

            return HandleResult(result);
        }

        // api/activities/${id}
        [Authorize(Policy = "IsActivityHost")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivity(Guid id)
        {
            var result = await Mediator.Send(new Delete.Command { Id = id });

            return HandleResult(result);
        }

        // api/activities/${id}/attend
        [HttpPost("{id}/attend")]
        public async Task<IActionResult> Attend(Guid id)
        {
            var result = await Mediator.Send(new UpdateAttendance.Command { Id = id });
            
            return HandleResult(result);
        }
    }
}
