using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ScavengerHunt.Hunts.Implementation
{
	public static class HuntStepLinkExtensions
	{
		public static IQueryable<Data.HuntStepLink> ByHuntStep(this IQueryable<Data.HuntStepLink> query, int huntStepId)
		{
			if (query == null)
				return null;

			return query.Where(hsl => hsl.CurrentStep == huntStepId);
		}
	}
}
