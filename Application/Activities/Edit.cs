using AutoMapper;
using Domain;
using FluentValidation;
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

        // Fluent Validation
        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                // Setting up a validator for the Edit Command
                // See ActivityValidator class for more details
                RuleFor(x => x.Activity).SetValidator(new ActivityValidator());
            }

        }

        public class Handler : IRequestHandler<Command>
        {

            private readonly DataContext _context;
            private readonly IMapper _mapper;

            // inject data context
            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
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
                _mapper.Map(request.Activity,currentActivity);

                await _context.SaveChangesAsync();
            }
        }
    }
}

