using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Persistence;
using Application.Activities;
using AutoMapper;
using AutoMapper.QueryableExtensions;

namespace Application.Activities
{
    public class List
    {
        // Fetch Data
        public class Query : IRequest<Result<List<ActivityDto>>> { }

        public class Handler : IRequestHandler<Query, Result<List<ActivityDto>>>
        {
            private readonly DataContext _context;
            private readonly ILogger<List> _logger;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper, ILogger<List> logger)
            {
                _logger = logger;
                _context = context;
                _mapper = mapper;
            }

            // A task is an object that represents some work that should be done
            // Hence, it should be async.

            // Cancellation Token is what we get from the user when he's no longer
            // Interested in the request he made (Exiting from the app etc)
            public async Task<Result<List<ActivityDto>>> Handle(
                Query request,
                CancellationToken cancellationToken
            )
            {
                // ProjectTo is a method provided by AutoMapper that allows us to project our query directly into a DTO.

                var activities = await _context.Activities
                    .ProjectTo<ActivityDto>(_mapper.ConfigurationProvider)
                    .ToListAsync();

                return Result<List<ActivityDto>>.Success(activities);
            }
        }
    }
}
