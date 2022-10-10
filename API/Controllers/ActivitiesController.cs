using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application;
using Application.Activities;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;


namespace API.Controllers
{
    public class ActivitiesController : BaseApiController
    {

        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<Activity>>> GetActivities()
        {
            var result= await Mediator.Send(new List.Query());

            return Ok(result);
        }

        [HttpGet("{Id}")]
        public async Task<ActionResult<Activity>> GetActivity(Guid Id)
        {
            var result= await Mediator.Send(new Details.Query{Id=Id});
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> CreateActivity(Activity activity)
        {
            return Ok(await Mediator.Send(new Create.Command{Activity=activity}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateActivity(Guid id, Activity activity)
        {
            activity.Id=id;
            return Ok(await Mediator.Send(new Edit.Command{Activity=activity}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivity(Guid id)
        {
            return Ok(await Mediator.Send(new Delete.Command{Id=id}));
        }

    }
}