namespace Application.Core
{
	public class AppException
	{
		// Middleware is a software that acts as a bridge between an operating system or database and applications, especially on a network.
		// It essentially handles requests and responses, it's being assembled into an app pipeline.
		// Exception handling delegates should be called early in the pipeline, so they can catch exceptions that occur in laters tgaes of the pipeline.
		public AppException(int statusCode, string message, string details = null)
		{
			StatusCode = statusCode;
			Message = message;
			Details = details;
		}

		public int StatusCode { get; set; }
		public string Message { get; set; }
		public string Details { get; set; }

	}
}

