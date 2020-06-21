using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Flashcards;
using Flashcards.Storages;
using MongoDB.Driver;

namespace FlashcardsApi.Mongo
{
    public class MongoCardStorage : ICardStorage
    {
        private readonly IMongoContext context;
        public MongoCardStorage(IMongoContext context)
        {
            this.context = context;
        }

        public async Task AddCard(Card card, CancellationToken token = default(CancellationToken))
        {
            await context.Cards.InsertOneAsync(card, cancellationToken: token);
        }

        public async Task<Card> FindCard(Guid id, CancellationToken token = default(CancellationToken))
        {
            return await context.Cards.Find(c => c.Id == id).FirstOrDefaultAsync(token);
        }

        public async Task DeleteCard(Guid id, CancellationToken token = default(CancellationToken))
        {
            await context.Cards.FindOneAndDeleteAsync(c => c.Id == id, cancellationToken: token);
        }

        public async Task<List<Card>> GetCollectionCards(Guid id, CancellationToken token = default(CancellationToken))
        {
            return await context.Cards.Find(c => c.CollectionId == id).ToListAsync(token);
        }

        public async Task UpdateCardPeriodicity(Guid id, int delta, CancellationToken token = default(CancellationToken))
        {
            var update = Builders<Card>.Update;
            await context.Cards.UpdateOneAsync(c => c.Id == id, update.Inc(c => c.Periodicity, delta), cancellationToken: token);
        }
    }
}