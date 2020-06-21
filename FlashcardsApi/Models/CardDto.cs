using System;

namespace FlashcardsApi.Models
{
    public class CardDto
    {
        public Guid CollectionId { get; set; }
        public string Word { get; set; }
        public string Translation { get; set; }
        public string Img { get; set; }
    }
}
