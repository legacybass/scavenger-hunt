using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ScavengerHunt.Hunts.Implementation
{
	public static class HuntStepExtensions
	{
		public static IQueryable<Data.HuntStep> ByHunt(this IQueryable<Data.HuntStep> query, int huntId)
		{
			if (query == null)
				return null;

			return query.Where(hs => hs.HuntId == huntId);
		}
	}
}
