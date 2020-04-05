using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace ScavengerHunt.Hunts
{
	public class HuntStep
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

		public Hunt Hunt { get; set; }

		public IEnumerable<HuntStep> NextSteps { get; set; }
		public HuntStep PreviousStep { get; set; }
	}
}
