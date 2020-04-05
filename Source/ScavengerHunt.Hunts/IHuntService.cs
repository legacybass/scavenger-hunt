using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ScavengerHunt.Hunts
{
	public interface IHuntService
	{
		Task<IEnumerable<Hunt>> GetHunts();
		Task<Hunt> GetHunt(int huntId);
		Task<Hunt> GetHunt(string huntName);
		Task<HuntStep> GetFirstStep(int huntId);
		Task<HuntStep> CheckResponse(int huntStepId, string response);
	}
}
