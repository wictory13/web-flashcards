using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Flashcards;
using Flashcards.Storages;
using FlashcardsApi.Config;
using FlashcardsApi.Mongo;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;


namespace FlashcardsApi
{
    public class StartupProj
    {
        public StartupProj(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                    .AddJwtBearer(options =>
                    {
                        options.RequireHttpsMetadata = false;
                        options.TokenValidationParameters = new TokenValidationParameters
                        {
                            ValidateIssuer = true,
                            ValidIssuer = AuthOptions.Issuer,

                            ValidateAudience = false,
                            ValidAudience = AuthOptions.Audience,

                            ValidateLifetime = false,

                            IssuerSigningKey = AuthOptions.GetSymmetricSecurityKey(),
                            ValidateIssuerSigningKey = true,
                        };
                    });

            services.AddMvc()
                .SetCompatibilityVersion(CompatibilityVersion.Latest);
            services.AddMvc().AddJsonOptions(opt => opt.SerializerSettings.TypeNameHandling = TypeNameHandling.Auto);

            services.AddSpaStaticFiles(configuration => { configuration.RootPath = "client/build"; });

            var config = new ServerConfig();
            Configuration.Bind(config);

            services.AddSingleton(config.MongoDb);
            services.AddSingleton<IMongoContext, MongoContext>();
            services.AddSingleton<ICardStorage, MongoCardStorage>();
            services.AddSingleton<ICollectionStorage, MongoCollectionStorage>();
            services.AddSingleton<IUserStorage, MongoUserStorage>();
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            app.UseDefaultFiles();
            app.UseSpaStaticFiles();
            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "client";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });


            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            app.UseAuthentication();

            app.UseMvc();
        }
    }
}
