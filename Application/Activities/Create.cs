using System;
using Application.Activities;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application
{
	public class Create
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
				// Setting up a validator for the Create Command
				// See ActivityValidator class for more details
				RuleFor(x => x.Activity).SetValidator(new ActivityValidator());
			}

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
				_context.Activities.Add(request.Activity);

				await _context.SaveChangesAsync();
            }
        }
	}
}

