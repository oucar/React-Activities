using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class ActivitiesController : ReactivitiesBaseController
    {
        private readonly DataContext _dataContext;
        public ActivitiesController(DataContext context)
        {
            _dataContext = context;
        }


        // api/activities
        [HttpGet]
        public async Task<ActionResult<List<Activity>>> GetActivities()
        {
            return await _dataContext.Activities.ToListAsync();
        }

        // api/activities/${id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Activity>> GetSingleActivity(Guid id)
        {
            return await _dataContext.Activities.FindAsync(id);
        }

    }
}
