using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Flashcards;
using System.IdentityModel.Tokens.Jwt;
using System.Threading.Tasks;
using Microsoft.IdentityModel.Tokens;
using System.Threading;
using Flashcards.Storages;
using FlashcardsApi.Models;
using Microsoft.AspNetCore.Authorization;

namespace FlashcardsApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : Controller
    {
        private readonly IUserStorage userStorage;

        public UsersController(IUserStorage userStorage)
        {
            this.userStorage = userStorage;
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateAccount([FromBody] UserDto user, CancellationToken token)
        {
            if (await userStorage.FindUserByLogin(user.Login, token) != null)
                return Forbid();

            await userStorage.AddUser(new User(user.Login, user.Password), token);
            return NoContent();
        }

        [HttpPost("token")]
        public async Task<IActionResult> Token([FromBody] UserDto user, CancellationToken token)
        {
            var identity = await GetIdentity(user.Login, user.Password, token);
            if (identity == null)
                return BadRequest();

            var now = DateTime.UtcNow;
            var jwt = new JwtSecurityToken(
                    issuer: AuthOptions.Issuer,
                    audience: AuthOptions.Audience,
                    notBefore: now,
                    claims: identity.Claims,
                    expires: now.Add(TimeSpan.FromMinutes(AuthOptions.Lifetime)),
                    signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(),
                        SecurityAlgorithms.HmacSha256));
            var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

            var response = new
            {
                token = encodedJwt,
                username = identity.Name
            };
            return Ok(response);
        }

        private async Task<ClaimsIdentity> GetIdentity(string login, string password, CancellationToken token = default(CancellationToken))
        {
            var user = await userStorage.FindUserByLogin(login, token);
            if (user == null)
                return null;
            if (user.PasswordHash != password)
                return null;

            var claims = new List<Claim>
            {
                new Claim(ClaimsIdentity.DefaultNameClaimType, user.Login)
            };
            var claimsIdentity = new ClaimsIdentity(claims, "Token");
            return claimsIdentity;
        }
    }
}
