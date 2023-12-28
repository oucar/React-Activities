using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
	public class Details
	{
        // IRequest<Result<Activity>> is an interface provided by MediatR that represents a request that returns a response. 
        // The response type is specified as a generic parameter, which in this case is Result<Activity>.
        // Result<Activity> contains information about whether the operation was successful, and if it was, it includes the result of the operation. 
        // In this case, the result of the operation is an Activity.
		public class Query : IRequest<Result<Activity>>
		{
			public Guid Id { get; set; }
		}

        // IRequestHandler is an interface provided by the MediatR library in .NET. 
        // It's used to handle requests of a certain type and produce a response.
        public class Handler : IRequestHandler<Query, Result<Activity>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Activity>> Handle(Query request, CancellationToken cancellationToken)
            {
                // rather than embedding this logic into controller itself,
                // it's a better idea to handle it in the handler
                var activity = await _context.Activities.FindAsync(request.Id);

                // no need to check if failed, as it's already handled in the activities controller
                return Result<Activity>.Success(activity);
            }
        }


    }
}

