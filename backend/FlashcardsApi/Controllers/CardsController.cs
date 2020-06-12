using System;
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
    [ApiController]
    public class CardsController : Controller
    {
        private readonly ICardStorage cardStorage;
        private readonly ICollectionStorage collectionStorage;

        public CardsController(ICardStorage cardStorage, ICollectionStorage collectionStorage)
        {
            this.cardStorage = cardStorage;
            this.collectionStorage = collectionStorage;
        }

        [Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult<Card>> GetById([FromRoute] Guid id, CancellationToken token)
        {
            var card = await cardStorage.FindCard(id, token);
            if (card == null)
                return NotFound();

            if (!User.Owns(card))
                return Forbid();

            return Ok(card);
        }

        [Authorize]
        [HttpPost("create")]
        public async Task<ActionResult> CreateCard([FromBody] CardDto cardDto, CancellationToken token) 
        {
            var newCard = new Card(cardDto.CollectionId, cardDto.Word, cardDto.Translation, User.Identity.Name);
            var collection = await collectionStorage.FindCollection(cardDto.CollectionId, token);

            if (collection == null)
                return UnprocessableEntity("collection does not exist");
            if (!User.Owns(collection))
                return Forbid();

            await cardStorage.AddCard(newCard, token);
            return Ok("Card created");
        }

        [HttpDelete("delete")]
        public async Task<ActionResult> DeleteCard([FromBody] Guid id, CancellationToken token)
        {
            var card = await cardStorage.FindCard(id, token);
            if (card == null)
                return NotFound();
            
            if (!User.Owns(card))
                return Forbid();

            await cardStorage.DeleteCard(id, token);
            return Ok("Card deleted");
        }

        [Authorize]
        [HttpPost("know")] 
        public async Task<ActionResult> KnowCard([FromBody] Guid id, CancellationToken token)
        {
            var card = await cardStorage.FindCard(id, token);
            if (card == null)
                return NotFound();

            if (!User.Owns(card))
                return Forbid();

            await cardStorage.UpdateCardPeriodicity(id, -1, token);
            return Ok();
        }
    }
}
