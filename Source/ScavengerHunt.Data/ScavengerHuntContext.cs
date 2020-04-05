using System;
using Microsoft.EntityFrameworkCore;

namespace ScavengerHunt.Data
{
	public class ScavengerHuntContext : DbContext
	{
		public ScavengerHuntContext(DbContextOptions options) : base(options)
		{
		}

		public DbSet<Hunt> Hunts { get; set; }
		public DbSet<HuntStep> HuntSteps { get; set; }
		public DbSet<HuntStepLink> HuntStepLinks { get; set; }

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			base.OnModelCreating(modelBuilder);

			modelBuilder.Entity<Hunt>(builder =>
			{
				builder.HasMany(h => h.HuntSteps)
				.WithOne(hs => hs.Hunt)
				.HasForeignKey(hs => hs.HuntId)
				.IsRequired();
			});

			modelBuilder.Entity<HuntStep>(builder =>
			{
				builder.HasOne(hs => hs.PreviousStep)
				.WithOne(hsl => hsl.Next)
				.HasForeignKey<HuntStepLink>(hs => hs.NextStep);

				builder.HasMany(hs => hs.NextSteps)
				.WithOne(hsl => hsl.Current)
				.HasForeignKey(hsl => hsl.CurrentStep);
			});
		}
	}
}
