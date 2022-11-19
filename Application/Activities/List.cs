using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class List
    {
        public class Query : IRequest<Result<IReadOnlyList<Activity>>>
        {

        }

        public class Handler : IRequestHandler<Query, Result<IReadOnlyList<Activity>>>
        {
            private readonly DataContext _dataContext;
            public Handler(DataContext dataContext)
            {
                _dataContext = dataContext;
            }
            
            public async Task<Result<IReadOnlyList<Activity>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var activities = await _dataContext.Activities.ToListAsync();
                return Result<IReadOnlyList<Activity>>.Success(activities);
            }
        }
    }
}