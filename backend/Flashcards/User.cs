using System;
using Newtonsoft.Json;
using MongoDB.Bson.Serialization.Attributes;


namespace Flashcards
{
    public class User
    {
        [BsonId]
        public Guid Id { get; set; }
        [BsonElement]
        public string Login { get; set; }
        [BsonElement]
        public string PasswordHash { get; set; }

        [BsonConstructor]
        [JsonConstructor]
        public User(Guid id, string login, string passwordHash)
        {
            Id = id;
            Login = login;
            PasswordHash = passwordHash; 
        }
        
        public User(string login, string password)
        {
            Id = Guid.NewGuid();
            Login = login;
            PasswordHash = password; // че-то делаем с паролем
        }
    }
}
