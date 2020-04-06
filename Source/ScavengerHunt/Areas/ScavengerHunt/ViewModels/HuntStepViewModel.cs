using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ScavengerHunt.Areas.ScavengerHunt.ViewModels
{
	public class HuntStepViewModel
	{
		public int HuntStepId { get; set; }

		[StringLength(200)]
		public string Title { get; set; }

		public string Content { get; set; }

		[StringLength(100)]
		public string Image { get; set; }

		[StringLength(50)]
		public string Url { get; set; }

		public int HuntId { get; set; }

		public bool IsFinished { get; set; }

		public HuntViewModel Hunt { get; set; }

		public IEnumerable<HuntStepViewModel> NextSteps { get; set; }
		public IEnumerable<HuntStepViewModel> PreviousSteps { get; set; }
	}
}
