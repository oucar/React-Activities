using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Domain;
using Microsoft.IdentityModel.Tokens;

namespace API.Services
{
    public class TokenService
    {
        public string CreateToken(AppUser user)
        {
            var claims = new List<Claim>{
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim(ClaimTypes.NameIdentifier, user.Id),
                new Claim(ClaimTypes.Email, user.Email)
            };

            // SymmetricSecurityKey is used to sign the token
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("9EC15EE9CB3F121F65EDE1FC8473801B75663857975813244F7A8E0ADFBFA4E8"));

            // SigningCredentials is used to generate the signature
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            // SecurityTokenDescriptor is used to describe the token
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(7),
                SigningCredentials = creds
            };

            // JwtSecurityTokenHandler is used to create the token
            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }
    }
}