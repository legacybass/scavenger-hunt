using System;
using System.Threading.Tasks;
using AutoMapper;
using EFRepository;
using Microsoft.Extensions.Logging;
using ScavengerHunt.Hunts.Implementation;
using Xunit;
using Data = ScavengerHunt.Data;
using FakeItEasy;
using Shouldly;
using System.Collections.Generic;
using System.Linq;

namespace ScavengerHunt.Hunts.Tests
{
	public class HuntServiceTests
	{
		protected IRepository<Data.Hunt> HuntRepository { get; set; }
		protected IRepository<Data.HuntStep> HuntStepRepository { get; set; }
		protected IRepository<Data.HuntStepLink> HuntStepLinkRepository { get; set; }
		protected ILogger<HuntService> Logger { get; set; }
		protected IMapper Mapper { get; set; }
		protected HuntService Service { get; }


		public HuntServiceTests()
		{
			Mapper = A.Fake<IMapper>();
			Logger = A.Dummy<ILogger<HuntService>>();
			HuntRepository = A.Fake<IRepository<Data.Hunt>>();
			HuntStepRepository = A.Fake<IRepository<Data.HuntStep>>();
			HuntStepLinkRepository = A.Fake<IRepository<Data.HuntStepLink>>();
			Service = new HuntService(HuntRepository, HuntStepRepository, HuntStepLinkRepository, Mapper, Logger);
		}

		[Theory]
		[InlineData(1, "test", "test")]
		[InlineData(1, "  test ", "test")]
		[InlineData(1, "Test", "test")]
		[InlineData(1, "test", "Test")]
		[InlineData(1, "test", "   test  ")]
		public async Task CheckResponse_GetsCorrectSingleActionResponse(int huntStepId, string response, string correctResponse)
		{
			// Arrange
			int correctStepId = 1,
				nextStepId = 73;

			var nextStep = new Data.HuntStep
			{
				HuntStepId = nextStepId,
				Previous = correctStepId
			};

			var correctStep = new Data.HuntStepLink
			{
				HuntStepLinkId = correctStepId,
				CorrectResponse = correctResponse,
				CurrentStep = huntStepId,
				NextStep = nextStepId
			};

			nextStep.PreviousStep = correctStep;

			var retrievedStep = new Data.HuntStep
			{
				HuntStepId = huntStepId,
				NextSteps = new List<Data.HuntStepLink>
				{
					correctStep,
					new Data.HuntStepLink
					{
						HuntStepLinkId = 2,
						CorrectResponse = " this is always the incorrect response",
						CurrentStep = huntStepId,
						NextStep = 42
					}
				}
			};

			correctStep.Current = retrievedStep;

			var findOneCall = A.CallTo(() => HuntStepRepository.FindOne(huntStepId));
			findOneCall.Returns(retrievedStep);

			// Act
			var result = await Service.CheckResponse(huntStepId, response);

			// Assert
			result.HuntStepId.ShouldBe(nextStepId);

			findOneCall.MustHaveHappenedOnceExactly();
		}

		[Theory]
		[InlineData(1)]
		public async Task GetFirstStep(int huntId)
		{
			var step = new Data.HuntStep
			{
				HuntStepId = 3
			};

			var hunt = new Data.Hunt
			{
				HuntId = huntId,
				HuntSteps = new List<Data.HuntStep>
				{
					new Data.HuntStep
					{
						HuntStepId = 1,
						Previous = 2
					},
					new Data.HuntStep
					{
						HuntStepId = 2,
						Previous = 4
					},
					step,
					new Data.HuntStep
					{
						HuntStepId = 4,
						Previous = 3
					}
				}
			};

			var queryable = new List<Data.Hunt>() { hunt };
			A.CallTo(() => HuntRepository.Entity).Returns(queryable.AsQueryable());

			var actual = await Service.GetFirstStep(huntId);

			actual.ShouldNotBeNull();
			actual.HuntStepId.ShouldBe(step.HuntStepId);
		}
	}
}
