using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ScavengerHunt.Areas.ScavengerHunt.ViewModels
{
	public class HuntViewModel
	{
		public int HuntId { get; set; }

		[StringLength(50)]
		public string Name { get; set; }

		public string Description { get; set; }

		public IEnumerable<HuntStepViewModel> HuntSteps { get; set; }
	}
}
