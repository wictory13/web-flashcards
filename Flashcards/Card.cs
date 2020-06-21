using System;
using Newtonsoft.Json;
using MongoDB.Bson.Serialization.Attributes;


namespace Flashcards
{
    public class Card : IOwned
    {
        [BsonId]
        public Guid Id { get; set; }
        [BsonElement]
        public Guid CollectionId { get; }
        [BsonElement]
        public string Word { get; }
        [BsonElement]
        public string Translation { get; }
        [BsonElement]
        public string Img { get; }
        [BsonElement]
        public int Periodicity { get; private set; } // <0 - пользователю знает карточку, >0 - не знет
        [BsonElement]
        public string OwnerLogin { get; }

        [BsonConstructor]
        [JsonConstructor]
        public Card(Guid id, string word, string translation, string img, string ownerLogin, Guid collectionId, int periodicity = 0)
        {
            Id = id;
            CollectionId = collectionId;
            Word = word;
            Translation = translation;
            Img = img;
            Periodicity = periodicity;
            OwnerLogin = ownerLogin;
        }

        public Card(Guid collectionId, string word, string translation, string img, string ownerLogin, int periodicity = 0)
        {
            Id = Guid.NewGuid();
            CollectionId = collectionId;
            Word = word;
            Translation = translation;
            Img = img;
            Periodicity = periodicity;
            OwnerLogin = ownerLogin;
        }

        public void Know() => this.Periodicity -= 1;
        public void DoNotKnow() => this.Periodicity += 1;
    }
}
