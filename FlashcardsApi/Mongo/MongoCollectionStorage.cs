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
    public class MongoCollectionStorage : ICollectionStorage
    {
        private readonly IMongoContext context;
        public MongoCollectionStorage(IMongoContext context)
        {
            this.context = context;
        }
        
        public async Task AddCollection(Collection collection, CancellationToken token = default(CancellationToken))
        {
            await context.Collections.InsertOneAsync(collection, cancellationToken: token);
        }
        
        public async Task<Collection> FindCollection(Guid id, CancellationToken token = default(CancellationToken))
        {
            return await context.Collections.Find(c => c.Id == id).FirstOrDefaultAsync(token);
        }

        public async Task<IEnumerable<Collection>> GetAllCollections(CancellationToken token = default(CancellationToken))
        {
            return await context.Collections.Find(c => true).ToListAsync(token);
        }
        
        public async Task DeleteCollection(Guid id, CancellationToken token = default(CancellationToken))
        {
            await context.Collections.FindOneAndDeleteAsync(c => c.Id == id, cancellationToken: token);
        }

        public async Task<List<Card>> GetCollectionCards(Guid id, CancellationToken token = default(CancellationToken))
        {
            return await context.Cards.Find(c => c.CollectionId == id).ToListAsync(token);
        }
    }
}