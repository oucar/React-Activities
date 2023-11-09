using System;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
	public class Edit
	{
        public class Command : IRequest
        {
            public Activity Activity { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {

            private readonly DataContext _context;

            // inject data context
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                var currentActivity = await _context.Activities.FindAsync(request.Activity.Id);

                // Don't allow users to edit the Id
                // No Activity can be found with the ID in the request
                if (currentActivity == null)
                {
                    Console.WriteLine("ERROR: No Activity can be found! Are you trying to edit the ID?");
                    throw new InvalidOperationException("ERROR: No Activity can be found! Are you trying to edit the ID?");
                }

                // if request.Activity.Title is NULL, then set it to currentActivity.Title (don't change it)
                currentActivity.Title = request.Activity.Title ?? currentActivity.Title;

                await _context.SaveChangesAsync();
            }
        }
    }
}

