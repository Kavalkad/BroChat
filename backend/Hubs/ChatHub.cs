using System.Text;
using System.Text.Json;
using backend.Interfaces;
using backend.Models;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Caching.Distributed;

namespace backend.Hubs
{
    public class ChatHub(IDistributedCache cache) : Hub<IChatClient>
    {
        private readonly IDistributedCache _cache = cache;

        public async Task JoinChat(UserConnection connection)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, connection.ChatRoom);
            
            var stringConnection = JsonSerializer.Serialize(connection);

            await _cache.SetStringAsync(Context.ConnectionId, stringConnection);

            await Clients
                .Group(connection.ChatRoom)
                .ReceiveMessage("", $" Бро {connection.UserName} присоединился к чату ");
        }
       
        public async Task SendMessage(string message)
        {
            var connectionString = await _cache.GetAsync(Context.ConnectionId);

            

            var connection = JsonSerializer.Deserialize<UserConnection>(connectionString);

            if (connection is not null)
            {
                Console.WriteLine(connection.ChatRoom + connection.UserName);

                var messageModel = new Message
                {
                    UserName = connection.UserName,
                    Time = DateTime.Now,
                    Content = message
                };
                var messageString = JsonSerializer.Serialize(messageModel);

                await _cache.SetStringAsync(connection.ChatRoom, messageString);

                await Clients
                    .Group(connection.ChatRoom)
                    .ReceiveMessage("Bro " + connection.UserName, message);

            }
        }
        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            var connectionString = await _cache.GetStringAsync(Context.ConnectionId);

            var connection = JsonSerializer.Deserialize<UserConnection>(connectionString);
            if (connection is not null)
            {
                await _cache.RemoveAsync(Context.ConnectionId);
                await Groups.RemoveFromGroupAsync(Context.ConnectionId, connection.ChatRoom);

                await Clients
                    .Group(connection.ChatRoom)
                    .ReceiveMessage("", $"Bro {connection.UserName} вышел из чата");
            }

            await base.OnDisconnectedAsync(exception);
        }
    }

}