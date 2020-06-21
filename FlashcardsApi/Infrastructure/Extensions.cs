using Flashcards;
using System.Security.Claims;

namespace FlashcardsApi
{
    public static class Extensions
    {
        public static bool Owns(this ClaimsPrincipal user, IOwned obj)
        {
            return user.Identity.Name == obj.OwnerLogin;
        }
    }
}
