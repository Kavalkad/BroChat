import {
  Button,
  Box,
  Flex,
  CloseButton,
  Heading,
  Input,
} from "@chakra-ui/react";
import { Message } from "./Message";
import { useState } from "react";


export const Chat = ({ messages, chatRoom, closeChat, sendMessage}) => {
  const [message, setMessage] = useState("");
  const isValid = message !== null;

  const onSendMessage = async () => {
    sendMessage(message)
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-[#0f1117] flex items-center justify-center p-6">
      <Box
        w="full"
        maxW="400px"
        rounded="xl"
        overflow="hidden"
        shadow="2xl"
        borderWidth="1px"
        borderColor="whiteAlpha.100"
      >
        <Flex justify="space-between">
          <Heading
            className="text-center flex-1"
            fontSize="2xl"
            color="whiteAlpha.400"
            letterSpacing="tight"
          >
            {chatRoom}
          </Heading>
          <CloseButton align="center" onClick={closeChat} />
        </Flex>

        <Flex
          bgGradient="to-r"
          gradientFrom="cyan.900"
          gradientVia="blue.950"
          gradientTo="indigo.950"
          borderBottomWidth="1px"
          borderColor="whiteAlpha.100"
          color="black"
          px={7}
          py={5}
          allign="center"
          gap={5}
        >
          <div>
            {messages.map((messageInfo, index) => (
              <Message messageInfo={messageInfo} key={index} />
            ))}
          </div>
        </Flex>
        <div>
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Введите сообщение"
            size="md"
            variant="outline"
            color="white"
            borderColor="whiteAlpha.100"
            bg="whiteAlpha.50"
            rounded="xl"
            px={4}
            _placeholder={{ color: "gray.600", fontSize: "sm" }}
            _hover={{ borderColor: "whiteAlpha.200" }}
            _focus={{
              borderColor: "cyan.500",
              boxShadow: "0 0 0 1px var(--chakra-colors-cyan-500)",
            }}
          />
          <Button
            onClick={onSendMessage}
            size="md"
            width="full"
            bgColor="grey.100"
            rounded="4xl"
            mt={1}
            disabled={!isValid}
            className={[
              "rounded-xl font-semibold text-sm transition-all duration-200 cursor-pointer",
              isValid
                ? "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-lg shadow-cyan-500/20"
                : "bg-white/5 text-white/25 cursor-not-allowed",
            ].join(" ")}
          >
            Отправить
          </Button>
        </div>
      </Box>
    </div>
  );
};
