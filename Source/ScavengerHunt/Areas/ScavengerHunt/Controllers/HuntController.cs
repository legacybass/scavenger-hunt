using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using ScavengerHunt.Areas.ScavengerHunt.ViewModels;
using ScavengerHunt.Hunts;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ScavengerHunt.Areas.ScavengerHunt.Controllers
{
	[Area("ScavengerHunt")]
	public class HuntController : Controller
	{
		protected IHuntService HuntService { get; }
		protected IMapper Mapper { get; }
		protected ILogger<HuntController> Logger { get; }

		public HuntController(IHuntService huntService, IMapper mapper, ILogger<HuntController> logger)
		{
			HuntService = huntService;
			Mapper = mapper;
			Logger = logger;
		}

		[ActionName("Get")]
		public async Task<HuntViewModel> GetHunt([FromQuery] string huntName, [FromQuery] int? huntId)
		{
			if (string.IsNullOrWhiteSpace(huntName) && !huntId.HasValue)
				throw new ArgumentException("You must use either the hunt name or id");

			Hunt hunt;
			if (huntId.HasValue)
			{
				Logger.LogDebug($"Checking hunt by id: {huntId}");
				hunt = await HuntService.GetHunt(huntId.Value);

				if (hunt == null)
					throw new ArgumentException($"No hunt could be found with id {huntId}");

			}
			else
			{
				Logger.LogDebug($"Checking for hunt with name {huntName}");

				hunt = await HuntService.GetHunt(huntName);

				if (hunt == null)
					throw new ArgumentException($"No hunt could be found with the name {huntName}");
			}

			return Mapper.Map<HuntViewModel>(hunt);
		}

		[HttpPost, ActionName("submit")]
		public async Task<IActionResult> SubmitResponse([FromRoute] int id, [FromBody] HuntStepResponse response)
		{
			var next = await HuntService.CheckResponse(id, response.Response);

			if (next == null)
				return BadRequest("That response was incorrect");

			var mapped = Mapper.Map<HuntStepViewModel>(next);
			return Json(mapped);
		}

		[ActionName("FirstStep")]
		public async Task<IActionResult> GetFirstStep([FromRoute] int id)
		{
			var step = await HuntService.GetFirstStep(id);

			if (step == null)
				return StatusCode(StatusCodes.Status204NoContent, "No steps found");

			var mapped = Mapper.Map<HuntStepViewModel>(step);
			return Json(mapped);
		}
	}
}
