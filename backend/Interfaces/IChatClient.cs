namespace backend.Interfaces 
{
    public interface IChatClient
    {
        Task ReceiveMessage(string userName, string message);
    }
}