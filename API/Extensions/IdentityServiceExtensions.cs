using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Services;
using Domain;
using Persistence;

namespace API.Extensions
{
    // static: no need to create instances of it.
    public static class IdentityServiceExtensions
    {
        public static IServiceCollection AddIdentityServices(this IServiceCollection services, IConfiguration config)
        {
            // AddIdentityCore: only adds the bare minimum of what we need to get up and running
            // Everything related to authentication and authorization is going to be added to the AddIdentityCore method
            services.AddIdentityCore<AppUser>(opt =>
            {

                // Password requirements
                opt.Password.RequireNonAlphanumeric = false;

            }).AddEntityFrameworkStores<DataContext>();

            services.AddAuthentication();
            // AddScoped is for individual HTTP requests - which is exactly what you want with a token
            services.AddScoped<TokenService>();

            return services;

        }
    }
}