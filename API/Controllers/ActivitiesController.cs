using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Application;
using Application.Activities;

namespace API.Controllers
{
    public class ActivitiesController : ReactivitiesBaseController
    {
        // api/activities
        [HttpGet]
        public async Task<ActionResult<List<Activity>>> GetActivities()
        {
            return await Mediator.Send(new List.Query());
        }

        // api/activities/${id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Activity>> GetSingleActivity(Guid id)
        {
            return await Mediator.Send(new Details.Query { Id = id });
        }

    }
}
