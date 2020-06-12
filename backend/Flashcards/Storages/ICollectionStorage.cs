using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Flashcards.Storages
{
    public interface ICollectionStorage
    {
        Task AddCollection(Collection collection, CancellationToken token = default(CancellationToken));
        Task<Collection> FindCollection(Guid id, CancellationToken token = default(CancellationToken));
        Task<IEnumerable<Collection>> GetAllCollections(CancellationToken token = default(CancellationToken));
        Task DeleteCollection(Guid id, CancellationToken token = default(CancellationToken));
        Task<List<Card>> GetCollectionCards(Guid id, CancellationToken token = default(CancellationToken));
    }
}
