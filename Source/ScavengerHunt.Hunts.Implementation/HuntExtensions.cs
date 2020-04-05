using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ScavengerHunt.Hunts.Implementation
{
	public static class HuntExtensions
	{
		public static IQueryable<Data.Hunt> ById(this IQueryable<Data.Hunt> queryable, int id)
		{
			if (queryable == null)
				return null;

			return queryable.Where(h => h.HuntId == id);
		}

		public static IQueryable<Data.Hunt> ByName(this IQueryable<Data.Hunt> queryable, string name)
		{
			if (queryable == null)
				return null;

			return queryable.Where(h => h.Name == name);
		}
	}
}
