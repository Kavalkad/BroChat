namespace backend.Models
{
    public class Message
    {
        public DateTime Time { get; set; } 
        public string UserName { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;
    }
}