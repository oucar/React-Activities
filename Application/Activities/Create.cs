﻿using System;
using Domain;
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
