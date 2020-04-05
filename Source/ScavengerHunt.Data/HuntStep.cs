using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace ScavengerHunt.Data
{
	[Table("HuntStep")]
	public class HuntStep
	{
		[Key]
		public int HuntStepId { get; set; }

		[StringLength(200)]
		public string Title { get; set; }

		public string Content { get; set; }

		[StringLength(100)]
		public string Image { get; set; }

		[StringLength(50)]
		public string Url { get; set; }

		public int HuntId { get; set; }

		[Column("PreviousStep")]
		public int? Previous { get; set; }

		public virtual Hunt Hunt { get; set; }

		public virtual ICollection<HuntStepLink> NextSteps { get; set; }
		public virtual HuntStepLink PreviousStep { get; set; }
	}
}
