using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace ScavengerHunt.Data
{
	[Table("Hunt")]
	public class Hunt
	{
		[Key]
		public int HuntId { get; set; }

		[StringLength(50)]
		public string Name { get; set; }

		public string Description { get; set; }

		public bool Inactive { get; set; }

		public virtual ICollection<HuntStep> HuntSteps { get; set; }
	}
}
