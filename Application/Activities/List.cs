using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Persistence;

namespace Application.Activities
{
	public class List
	{

        // Fetch Data
		public class Query : IRequest<Result<List<Activity>>>
		{

		}

        public class Handler : IRequestHandler<Query, Result<List<Activity>>>
        {
            private readonly DataContext _context;
            private readonly ILogger<List> _logger;

            public Handler(DataContext context, ILogger<List> logger)
            {
                _context = context;
                _logger = logger;
            }


            // A task is an object that represents some work that should be done
            // Hence, it should be async.

            // Cancellation Token is what we get from the user when he's no longer 
            // Interested in the request he made (Exiting from the app etc)
            public async Task<Result<List<Activity>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var activities = await _context.Activities.ToListAsync();

                return Result<List<Activity>>.Success(activities);  
            }
        }

    }
}

