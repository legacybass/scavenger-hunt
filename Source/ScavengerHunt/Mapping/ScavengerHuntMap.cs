using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using ViewModels = ScavengerHunt.Areas.ScavengerHunt.ViewModels;

namespace ScavengerHunt.Mapping
{
	public class ScavengerHuntMap : Profile
	{
		public ScavengerHuntMap()
		{
			CreateMap<Hunts.Hunt, Data.Hunt>()
				.MaxDepth(1)
				.ReverseMap()
				.MaxDepth(1);

			CreateMap<Hunts.Hunt, ViewModels.HuntViewModel>()
				.MaxDepth(1)
				.ReverseMap()
				.MaxDepth(1);

			CreateMap<Hunts.HuntStep, Data.HuntStep>()
			.ForMember(hs => hs.NextSteps, o => o.Ignore())
			.ForMember(hs => hs.PreviousStep, o => o.Ignore())
			.MaxDepth(1)
			.ReverseMap()
			.ForMember(hs => hs.PreviousStep, o => o.MapFrom(hs => hs.PreviousStep.Current))
			.ForMember(hs => hs.NextSteps, o => o.Ignore())
			.MaxDepth(1);

			CreateMap<Hunts.HuntStep, ViewModels.HuntStepViewModel>()
				.MaxDepth(0)
				.ReverseMap()
				.MaxDepth(0);
		}
	}
}
