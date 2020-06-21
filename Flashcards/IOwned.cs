using System;
using System.Collections.Generic;
using System.Text;

namespace Flashcards
{
    public interface IOwned
    {
        string OwnerLogin { get; }
    }
}
