using System;
using System.Collections.Generic;
using System.Net.Http.Headers;
using Flashcards.Storages;
using Newtonsoft.Json;
using MongoDB.Bson.Serialization.Attributes;


namespace Flashcards
{
    public class Collection : IOwned
    {
        [BsonId]
        public Guid Id { get; set; }

        [BsonElement]
        public string Name { get; }
        [BsonElement]
        public string OwnerLogin { get; }
        
        [BsonConstructor]
        [JsonConstructor]
        public Collection(Guid id, string name, string ownerLogin)
        {
            Id = id;
            Name = name;
            OwnerLogin = ownerLogin;
        }
        
        public Collection(string name, string ownerLogin)
        {
            Id = Guid.NewGuid();
            Name = name;
            OwnerLogin = ownerLogin;
        }
    }
}