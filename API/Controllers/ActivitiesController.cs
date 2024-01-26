using Domain;
using Microsoft.AspNetCore.Mvc;
using Application;
using Application.Activities;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{
    [AllowAnonymous]
    public class ActivitiesController : ReactivitiesBaseController
    {
        // GET api/activities
        [HttpGet]
        public async Task<IActionResult> GetActivities()
        {
            var result = await Mediator.Send(new List.Query());

            return HandleResult(result);
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
        [HttpPut("{id}")]
        public async Task<IActionResult> EditActivity(Guid id, Activity activity)
        {
            var result = await Mediator.Send(new Edit.Command { Activity = activity });

            return HandleResult(result);
        }

        // api/activities/${id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivity(Guid id)
        {   
            var result = await Mediator.Send(new Delete.Command { Id = id });
        
            return HandleResult(result);
        }
    }
}
