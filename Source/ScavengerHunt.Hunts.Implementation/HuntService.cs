using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using EFRepository;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using ScavengerHunt.Data;

namespace ScavengerHunt.Hunts.Implementation
{
	public class HuntService : IHuntService
	{
		protected IRepository<Data.Hunt> HuntRepository { get; }
		protected IRepository<Data.HuntStep> HuntStepRepository { get; }
		protected IRepository<HuntStepLink> HuntStepLinkRepository { get; }
		protected IMapper Mapper { get; }
		protected ILogger<HuntService> Logger { get; }

		public HuntService(IRepository<Data.Hunt> huntRepository, IRepository<Data.HuntStep> huntStepRepository,
			IRepository<HuntStepLink> huntStepLinkRepository, IMapper mapper, ILogger<HuntService> logger)
		{
			HuntRepository = huntRepository;
			HuntStepRepository = huntStepRepository;
			HuntStepLinkRepository = huntStepLinkRepository;
			Mapper = mapper;
			Logger = logger;
		}

		public Task<HuntStep> CheckResponse(int huntStepId, string response) => Task.Run(() =>
		{
			if (string.IsNullOrWhiteSpace(response))
				return null;

			response = response.Trim();

			Logger.LogDebug($"Checking step response for {huntStepId}");

			var steps = HuntStepLinkRepository.Entity
			.Include(hsl => hsl.Next)
			.ByHuntStep(huntStepId);

			if (steps == null || !steps.Any())
				return null;

			var next = steps.AsEnumerable()
			.FirstOrDefault(ns =>
			{
				if (ns.CorrectResponse.Contains("|"))
				{
					return ns.CorrectResponse.Split('|').Any(cr => cr.Trim() == response);
				}
				else if (ns.CorrectResponse == response)
					return true;

				return false;
			});

			if (next?.Next != null)
				return Mapper.Map<HuntStep>(next.Next);

			Logger.LogDebug($"No correct response found");

			return null;
		});

		public Task<Hunt> GetHunt(int huntId) => Task.Run(() =>
		{
			var hunt = HuntRepository.FindOne(huntId);
			if (hunt == null)
				return null;

			return Mapper.Map<Hunt>(hunt);
		});

		public Task<Hunt> GetHunt(string huntName) => Task.Run(() =>
		{
			var hunt = HuntRepository.Entity.ByName(huntName)
			.FirstOrDefault();

			if (hunt == null)
				return null;

			return Mapper.Map<Hunt>(hunt);
		});

		public Task<HuntStep> GetFirstStep(int huntId) => Task.Run(() =>
		{
			var steps = HuntStepRepository.Entity.ByHunt(huntId);

			if (steps == null || !steps.Any())
				throw new ArgumentException($"No hunt found with id {huntId}");

			var firstStep = steps?.FirstOrDefault(hs => hs.Previous == null);

			if (firstStep == null)
				return null;

			return Mapper.Map<HuntStep>(firstStep);
		});

		public Task<IEnumerable<Hunt>> GetHunts() => Task.Run(() =>
		{
			var hunts = HuntRepository.Entity.AreActive();

			return hunts.Select(h => Mapper.Map<Hunt>(h)).AsEnumerable();
		});
	}
}
