using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace ScavengerHunt.Hunts
{
	public class Hunt
	{
		public int HuntId { get; set; }

		[StringLength(50)]
		public string Name { get; set; }

		public string Description { get; set; }

		public IEnumerable<HuntStep> HuntSteps { get; set; }
	}
}
