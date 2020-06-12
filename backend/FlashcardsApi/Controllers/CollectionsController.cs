using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Flashcards;
using FlashcardsApi.Models;
using Microsoft.AspNetCore.Authorization;
using System.Threading.Tasks;
using System.Threading;
using Flashcards.Storages;

namespace FlashcardsApi.Controllers
{
    [Route("api/[controller]")]
    public class CollectionsController : Controller
    {
        private readonly ICollectionStorage collectionStorage;
        private readonly ICardStorage cardStorage;

        public CollectionsController(ICollectionStorage collectionStorage, ICardStorage cardStorage)
        {
            this.collectionStorage = collectionStorage;
            this.cardStorage = cardStorage;
        }

        [Authorize]
        [HttpGet("all")]
        public async Task<ActionResult<IEnumerable<CollectionDto>>> GetAll(CancellationToken token)
        {
            return Ok((await collectionStorage.GetAllCollections(token))
                .Where(collection => User.Owns(collection)));
        }

        [Authorize]
        [HttpPost("create")]
        public async Task<ActionResult> AddCollection([FromBody] string name, CancellationToken token)
        {
            var newCollection = new Collection(name, User.Identity.Name);
            await collectionStorage.AddCollection(newCollection, token);

            return Ok("Collection created");
        }

        [Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult> GetCollection(Guid id, CancellationToken token)
        {
            var collection = await collectionStorage.FindCollection(id, token);
            if (collection == null)
                return NotFound();

            if (User.Owns(collection))
                return Ok(collection);
            return Forbid();
        }

        [Authorize]
        [HttpGet("{id}/cards")]
        public async Task<ActionResult> GetCollectionCards(Guid id, CancellationToken token)
        {
            var collection = await collectionStorage.FindCollection(id, token);
            if (collection == null)
                return NotFound();

            if (User.Owns(collection))
                return Ok(await collectionStorage.GetCollectionCards(id, token));
            return Forbid();
        }

        [HttpDelete("delete")]
        public async Task<ActionResult> DeleteCollection([FromBody] Guid id, CancellationToken token)
        {
            var collection = await collectionStorage.FindCollection(id, token);
            if (collection == null)
                return NotFound();

            if (!User.Owns(collection))
                return Forbid();

            await collectionStorage.DeleteCollection(id, token);
            return Ok("Collection deleted");
        }

        [Authorize]
        [HttpGet("{id}/next")]
        public async Task<ActionResult> GetNextCard(Guid id, CancellationToken token)
        {
            var collection = await collectionStorage.FindCollection(id, token);
            if (collection == null)
                return NotFound();

            if (User.Owns(collection))
            {
                var unknownCards = (await collectionStorage.GetCollectionCards(id, token)).Where(c => c.Periodicity > -3).ToList();
                if (unknownCards.Count == 0)
                    return NoContent();
                var rnd = new Random();
                return Ok(unknownCards[rnd.Next(unknownCards.Count)]);
            }
            return Forbid();
        }

        [Authorize]
        [HttpPost("forget")]
        public async Task<ActionResult> ForgetCollection([FromBody] Guid id, CancellationToken token)
        {
            var collection = await collectionStorage.FindCollection(id, token);
            if (collection == null)
                return NotFound();

            if (User.Owns(collection))
            {
                var cards = await collectionStorage.GetCollectionCards(id, token);
                foreach (var card in cards)
                    await cardStorage.UpdateCardPeriodicity(card.Id, -card.Periodicity, token);

                return Ok("Collection forgotten");
            }
            return Forbid();
        }
    }
}
