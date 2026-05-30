import { HubConnectionBuilder } from "@microsoft/signalr";
import { WaitingRoom } from "./components/WaitingRoom";
import { Chat } from "./components/Chat";
import {  useState } from "react";

function App() {
  const [connection, setConnection] = useState(null);
  const [chatRoom, setChatRoom] = useState("");
  const [messages, setMessages] = useState([]);
  const [currentUser, setCurrentUser] = useState("");

  const joinChat = async (userName, chatRoom) => {
    var connection = new HubConnectionBuilder()
      .withUrl("http://localhost:5176/chat")
      .withAutomaticReconnect()
      .build();

    connection.on("ReceiveMessage", (userName, message) => {
      const time = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      setMessages((messages) => [...messages, { userName, message, time }]);
    });

    try {
      await connection.start();
      await connection.invoke("JoinChat", { userName, chatRoom });

      setConnection(connection);
      setChatRoom(chatRoom);
      setCurrentUser(userName);
    } catch (error) {
      console.log(error);
    }
  };

  const sendMessage = async (message) => {
    connection.invoke("SendMessage", message);
  };

  const closeChat = async () => {
    await connection.stop();
    setConnection(null);
    setMessages([]);
    setCurrentUser("");
  };

  return (
    <div>
      {connection ? (
        <Chat
          messages={messages}
          chatRoom={chatRoom}
          closeChat={closeChat}
          sendMessage={sendMessage}
          currentUser={currentUser}
        />
      ) : (
        <WaitingRoom joinChat={joinChat} />
      )}
    </div>
  );
}

export default App;
