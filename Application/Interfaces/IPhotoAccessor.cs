using Application.Photos;
using Microsoft.AspNetCore.Http;

namespace Application.Interfaces
{
    public interface IPhotoAccessor
    {
        // Task<PhotoUploadResult> is used to represent an asynchronous operation that returns a PhotoUploadResult.
        // This allows the method to return immediately without blocking the calling thread and the actual work is done in the background.
        // When the work is done, the Task is marked as completed and the result can be retrieved.
        Task<PhotoUploadResult> AddPhoto(IFormFile file);

        // IFormFile is used to represent a file sent with the HttpRequest. 
        // It's used in model binding to represent uploaded files. 
        // The IFormFile interface includes properties like FileName, Length, etc. and method like CopyToAsync to save the file.

        // Task<string> is used to represent an asynchronous operation that returns a string.
        // Similar to Task<PhotoUploadResult>, it allows the method to return immediately and the actual work is done in the background.
        Task<string> DeletePhoto(string publicId);
    }
}