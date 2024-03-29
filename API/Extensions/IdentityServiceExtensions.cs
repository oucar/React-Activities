using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using API.Services;
using Domain;
using Infrastructure.Security;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.IdentityModel.Tokens;
using Persistence;

namespace API.Extensions
{
    // static: no need to create instances of it.
    public static class IdentityServiceExtensions
    {
        public static IServiceCollection AddIdentityServices(
            this IServiceCollection services,
            IConfiguration config
        )
        {
            // AddIdentityCore: only adds the bare minimum of what we need to get up and running
            // Everything related to authentication and authorization is going to be added to the AddIdentityCore method
            services
                .AddIdentityCore<AppUser>(opt =>
                {
                    // Authentication options
                    opt.Password.RequireNonAlphanumeric = false;
                    opt.User.RequireUniqueEmail = true;
                })
                .AddEntityFrameworkStores<DataContext>();

            // TODO: Will be fixed later!!
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["TokenKey"]));

            services
                .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(opt =>
                {
                    // Add the token validation parameters
                    opt.TokenValidationParameters = new TokenValidationParameters
                    {
                        // ValidateIssuerSigningKey: validate the signature of the token
                        ValidateIssuerSigningKey = true,
                        // IssuerSigningKey: the key that we're going to use to sign our token
                        IssuerSigningKey = key,
                        // ValidateIssuer: validate the issuer of the token
                        ValidateIssuer = false,
                        // ValidateAudience: validate the audience of the token
                        ValidateAudience = false,
                    };
                    
                    opt.Events = new JwtBearerEvents
                    {
                        OnMessageReceived = context =>
                        {
                            var accessToken = context.Request.Query["access_token"];
                            var path = context.HttpContext.Request.Path;
                            if (
                                !string.IsNullOrEmpty(accessToken)
                                && (path.StartsWithSegments("/chat"))
                            )
                            {
                                context.Token = accessToken;
                            }
                            return Task.CompletedTask;
                        }
                    };

                    // Add an event to the JwtBearerEvents to handle the token expired exception
                    opt.Events = new JwtBearerEvents
                    {
                        OnMessageReceived = context =>
                        {
                            // Get the token from the request
                            var accessToken = context.Request.Query["access_token"];

                            // Get the path
                            var path = context.HttpContext.Request.Path;

                            // Check if the token is not null and if the path starts with /chat
                            if (
                                !string.IsNullOrEmpty(accessToken)
                                && path.StartsWithSegments("/chat")
                            )
                            {
                                // Set the token
                                context.Token = accessToken;
                            }

                            return Task.CompletedTask;
                        }
                    };
                });

            services.AddAuthorization(opt =>
            {
                opt.AddPolicy(
                    "IsActivityHost",
                    policy =>
                    {
                        policy.Requirements.Add(new IsHostRequirement());
                    }
                );
            });

            // Transient makes it run as long as the method is running
            services.AddTransient<IAuthorizationHandler, IsHostRequirementHandler>();

            // AddScoped is for individual HTTP requests - which is exactly what you want with a token
            services.AddScoped<TokenService>();

            return services;
        }
    }
}
