using AutoMapper;
using EFRepository;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using ScavengerHunt.Data;
using ScavengerHunt.Hunts;
using ScavengerHunt.Hunts.Implementation;

namespace ScavengerHunt
{
	public class Startup
	{
		public Startup(IConfiguration configuration)
		{
			Configuration = configuration;
		}

		public IConfiguration Configuration { get; }

		// This method gets called by the runtime. Use this method to add services to the container.
		public void ConfigureServices(IServiceCollection services)
		{
			services.AddControllersWithViews();

			// In production, the React files will be served from this directory
			services.AddSpaStaticFiles(configuration =>
			{
				configuration.RootPath = "ClientApp/build";
			});

			services.AddDbContext<ScavengerHuntContext>(builder =>
			{
				string connectionString = Configuration.GetConnectionString("scavengerhunt");
				builder.UseSqlServer(connectionString);
			});

			services.AddTransient<DbContext, ScavengerHuntContext>();
			services.AddTransient(typeof(IRepository<>), typeof(Repository<>));
			services.AddTransient<IHuntService, HuntService>();

			services.AddAutoMapper(GetType().Assembly);
			services.AddCors();
		}

		// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
		public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
		{
			if (env.IsDevelopment())
			{
				app.UseDeveloperExceptionPage();
			}
			else
			{
				app.UseExceptionHandler("/Error");
				// The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
				app.UseHsts();
			}

			app.UseCors(options =>
			{
				options.AllowAnyOrigin();
				options.AllowAnyMethod();
				options.AllowAnyHeader();
			});
			app.UseHttpsRedirection();
			app.UseStaticFiles();
			app.UseSpaStaticFiles();

			app.UseRouting();

			app.UseEndpoints(endpoints =>
			{
				endpoints.MapAreaControllerRoute(
					name: "ScavengerHunt",
					areaName: "ScavengerHunt",
					pattern: "ScavengerHunt/api/{controller}/{action=Get}/{id?}");

				endpoints.MapControllerRoute(
					name: "default",
					pattern: "/api/{controller}/{action=Get}/{id?}");
			});

			app.UseSpa(spa =>
			{
				spa.Options.SourcePath = "ClientApp";

				if (env.IsDevelopment())
				{
					spa.UseReactDevelopmentServer(npmScript: "start");
				}
			});
		}
	}
}
