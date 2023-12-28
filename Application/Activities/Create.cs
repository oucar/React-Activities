using Application.Activities;
using Application.Core;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application
{
	public class Create
	{

		// Unit --> MediatR unit, means that we're not really returning anything
		public class Command : IRequest<Result<Unit>>
		{
			public Activity Activity { get; set; }
		}

		// Fluent Validation
		public class CommandValidator : AbstractValidator<Command>
		{
			public CommandValidator()
			{
				// Setting up a validator for the Create Command
				// See ActivityValidator class for more details
				RuleFor(x => x.Activity).SetValidator(new ActivityValidator());
			}

		}

		public class Handler : IRequestHandler<Command, Result<Unit>>
		{

			private readonly DataContext _context;

			// inject data context
			public Handler(DataContext context)
			{
				_context = context;
			}

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
				_context.Activities.Add(request.Activity);

				// returns an int.
				var result = await _context.SaveChangesAsync() > 0;

				if (!result) return Result<Unit>.Failure("Failed to create activity!");

				return Result<Unit>.Success(Unit.Value);
            }
        }
	}
}

