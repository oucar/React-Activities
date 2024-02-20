using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Persistence;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;

namespace Application.Activities
{
    public class List
    {
        // Fetch Data (paging, filtering, sorting etc.)
        public class Query : IRequest<Result<PagedList<ActivityDto>>>
        {
            public ActivityParams Params { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<PagedList<ActivityDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
            {
                _context = context;
                _mapper = mapper;
                _userAccessor = userAccessor;
            }

            // A task is an object that represents some work that should be done
            // Hence, it should be async.

            // Cancellation Token is what we get from the user when he's no longer
            // Interested in the request he made (Exiting from the app etc)
            public async Task<Result<PagedList<ActivityDto>>> Handle(
                Query request,
                CancellationToken cancellationToken
            )
            {
                // ProjectTo is a method provided by AutoMapper that allows us to project our query directly into a DTO.
                var query = _context.Activities
                    .Where(x => x.Date >= request.Params.StartDate)
                    .OrderBy(d => d.Date)
                    .ProjectTo<ActivityDto>(
                        _mapper.ConfigurationProvider,
                        new { currentUsername = _userAccessor.GetUsername() }
                    )
                    // defer the execution of the query until we call ToListAsync
                    .AsQueryable();

                Console.WriteLine("ERROR\n\n\n\n\n\n");
                if (request.Params.IsGoing && !request.Params.IsHost)
                {
                    query = query.Where(
                        x => x.Attendees.Any(a => a.Username == _userAccessor.GetUsername())
                    );
                }

                if (request.Params.IsHost && !request.Params.IsGoing)
                {
                    query = query.Where(x => x.HostUsername == _userAccessor.GetUsername());
                }

                return Result<PagedList<ActivityDto>>.Success(
                    await PagedList<ActivityDto>.CreateAsync(
                        query,
                        request.Params.PageNumber,
                        request.Params.PageSize
                    )
                );
            }
        }
    }
}
