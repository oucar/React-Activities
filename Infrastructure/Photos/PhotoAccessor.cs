using Application.Interfaces;
using Application.Photos;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;

namespace Infrastructure.Photos
{
    public class PhotoAccessor : IPhotoAccessor
    {
        private readonly Cloudinary _cloudinary;

        // Takes an IOptions<CloudinarySettings> object as a parameter, which is a way to access configuration settings.
        // The CloudinarySettings object contains the CloudName, ApiKey, and ApiSecret needed to interact with the Cloudinary API.
        public PhotoAccessor(IOptions<CloudinarySettings> config)
        {
            var account = new Account(
                config.Value.CloudName,
                config.Value.ApiKey,
                config.Value.ApiSecret
            );

            // This object will be used to interact with the Cloudinary API.
            _cloudinary = new Cloudinary(account);
        }

        public async Task<PhotoUploadResult> AddPhoto(IFormFile file)
        {
            // If the file is not empty, open a stream to read the file and upload it to Cloudinary.
            if (file.Length > 0)
            {
                // The using statement is used to declare and instantiate a resource, such as a file stream
                // And it ensures it's disposed when it's no longer needed
                await using var stream = file.OpenReadStream();
                var uploadParams = new ImageUploadParams
                {
                    File = new FileDescription(file.FileName, stream),
                    Transformation = new Transformation().Height(500).Width(500).Crop("fill")
                };

                var uploadResult = await _cloudinary.UploadAsync(uploadParams);

                if (uploadResult.Error != null)
                {
                    throw new Exception(uploadResult.Error.Message);
                }

                return new PhotoUploadResult
                {
                    PublicId = uploadResult.PublicId,
                    Url = uploadResult.SecureUrl.ToString()
                };
            }

            return null;
        }

        public async Task<string> DeletePhoto(string publicId)
        {
            var deleteParams = new DeletionParams(publicId);
            var result = await _cloudinary.DestroyAsync(deleteParams);
            return result.Result == "ok" ? result.Result : null;
        }
    }
}