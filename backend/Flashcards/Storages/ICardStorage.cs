using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Flashcards.Storages
{
    public interface ICardStorage
    {
        Task AddCard(Card card, CancellationToken token = default(CancellationToken));
        Task UpdateCardPeriodicity(Guid id, int delta, CancellationToken token = default(CancellationToken));
        Task<Card> FindCard(Guid id, CancellationToken token = default(CancellationToken));
        Task DeleteCard(Guid id, CancellationToken token = default(CancellationToken));
    }
}