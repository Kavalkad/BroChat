import {
  Button,
  Box,
  Flex,
  CloseButton,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";
import { Message } from "./Message";
import { useState, useEffect, useRef } from "react";

export const Chat = ({
  messages,
  chatRoom,
  closeChat,
  sendMessage,
  currentUser,
}) => {
  const [message, setMessage] = useState("");
  const isValid = message.trim() !== "";
  const messagesEndRef = useRef(null);

  const onSendMessage = async () => {
    if (!isValid) return;
    sendMessage(message);
    setMessage("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      onSendMessage();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Flex minH="100vh" bg="#0b0c10" align="center" justify="center" p={4}>
      <Box
        w="full"
        maxW="450px"
        h="650px"
        bg="rgba(31, 40, 51, 0.4)"
        backdropFilter="blur(16px)"
        borderRadius="2xl"
        overflow="hidden"
        shadow="2xl"
        borderWidth="1px"
        borderColor="whiteAlpha.100"
        display="flex"
        flexDirection="column"
      >
        <Flex
          justify="space-between"
          align="center"
          px={6}
          py={4}
          borderBottomWidth="1px"
          borderColor="whiteAlpha.100"
          bg="rgba(13, 40, 51, 0.2)"
        >
          <Flex align="center">
            <Box
              h={2.5}
              w={2.5}
              borderRadius="full"
              bg="cyan.400"
              boxShadow="0 0 10px #00b4d8"
              mr={3}
            />
            <Heading
              fontSize="lg"
              fontWeight="bold"
              color="white"
              letterSpacing="wide"
            >
              #{chatRoom}
            </Heading>
          </Flex>

          <CloseButton
            color="whiteAlpha.700"
            _hover={{ bg: "whiteAlpha.100", color: "white" }}
            onClick={closeChat}
            size="md"
            borderRadius="full"
          />
        </Flex>

        <Box
          flex={1}
          overflowY="auto"
          px={6}
          py={4}
          display="flex"
          flexDirection="column"
          css={{
            "&::-webkit-scrollbar": {
              width: "4px",
            },
            "&::-webkit-scrollbar-track": {
              background: "transparent",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "rgba(255, 255, 255, 0.1)",
              borderRadius: "4px",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              background: "rgba(255, 255, 255, 0.2)",
            },
          }}
        >
          {messages.length === 0 ? (
            <Flex
              h="full"
              direction="column"
              align="center"
              justify="center"
              color="whiteAlpha.400"
              gap={2}
              m="auto"
            >
              <Text fontSize="3xl">💬</Text>
              <Text fontSize="sm">Здесь пока нет сообщений</Text>
            </Flex>
          ) : (
            messages.map((messageInfo, index) => (
              <Message
                messageInfo={messageInfo}
                currentUser={currentUser}
                key={index}
              />
            ))
          )}
          <Box ref={messagesEndRef} />
        </Box>
        <Box
          p={4}
          borderTopWidth="1px"
          borderColor="whiteAlpha.100"
          bg="rgba(31, 40, 51, 0.3)"
          display="flex"
          flexDirection="column"
          gap={2}
        >
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Напишите сообщение вашим Бро"
            onKeyDown={handleKeyPress}
            size="md"
            color="white"
            bg="whiteAlpha.100"
            borderRadius="xl"
            px={4}
            py={3}
            border="1px solid"
            borderColor="transparent"
            _placeholder={{ color: "whiteAlpha.400", fontSize: "sm" }}
            _hover={{ bg: "whiteAlpha.200" }}
            _focus={{
              bg: "whiteAlpha.200",
              borderColor: "cyan.500",
              boxShadow: "0 0 0 1px #00b4d8",
            }}
          />
          <Button
            onClick={onSendMessage}
            size="md"
            w="full"
            borderRadius="xl"
            isDisabled={!isValid}
            bg={
              isValid
                ? "linear-gradient(135deg, #00b4d8 0%, #0077b6 100%)"
                : "whiteAlpha.50"
            }
            color={isValid ? "white" : "whiteAlpha.300"}
            _hover={
              isValid
                ? {
                    bg: "linear-gradient(135deg, #00c4e8 0%, #0087c6 100%",
                    boxShadow: "0 4px 12px rgba(0, 100, 216, 0.3)",
                  }
                : {
                    bg: "whiteAlpha.50",
                  }
            }
            _active={
              isValid
                ? {
                    bg: "linear-gradient(135deg, #00a4c8 0%, #0067a6 100%)",
                  }
                : {}
            }
            transition="all 0.2s"
            fontWeight="semibold"
            fontSize="sm"
            h={10}
          >
            Отправить
          </Button>
        </Box>
      </Box>
    </Flex>
  );
};
