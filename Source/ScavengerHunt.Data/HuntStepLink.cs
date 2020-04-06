using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace ScavengerHunt.Data
{
	[Table("HuntStepLink")]
	public class HuntStepLink
	{
		[Key]
		public int HuntStepLinkId { get; set; }
		public int CurrentStep { get; set; }
		public int? NextStep { get; set; }

		[StringLength(50)]
		public string CorrectResponse { get; set; }

		public virtual HuntStep Current { get; set; }
		public virtual HuntStep Next { get; set; }
	}
}
