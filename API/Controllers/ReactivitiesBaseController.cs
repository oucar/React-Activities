using Application.Core;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReactivitiesBaseController : ControllerBase
    {
        private IMediator _mediator;

        // if null assign anything to the right to _mediator
        protected IMediator Mediator => _mediator ??= HttpContext.RequestServices.GetService<IMediator>();

        // ActionResult is responsible for executing the result of an action method, which could be rendering a view, 
        // redirecting to another action or controller, or returning data as a response.
        protected ActionResult HandleResult<T>(Result<T> result)
        {
            // For Delete method - when no activity is found
            if (result == null) return NotFound();

            if (result.IsSuccess && result.Value != null) return Ok(result.Value);

            if (result.IsSuccess && result.Value == null) return NotFound();

            return BadRequest(result.Error);
        }
    }
}
