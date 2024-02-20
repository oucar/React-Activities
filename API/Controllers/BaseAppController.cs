using Application.Core;
using API.Extensions;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BaseAppController : ControllerBase
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

        // Handling Paged Results
        protected ActionResult HandlePagedResult<T>(Result<PagedList<T>> result)
        {
            if (result == null) return NotFound();
            if (result.IsSuccess && result.Value != null)
            {
                Response.AddPaginationHeader(result.Value.CurrentPage, result.Value.PageSize,
                    result.Value.TotalCount, result.Value.TotalPages);
                return Ok(result.Value);
            }

            if (result.IsSuccess && result.Value == null)
                return NotFound();
            return BadRequest(result.Error);
        }
    }
}
