import { Flex, Box, Text } from "@chakra-ui/react";

export const Message = ({ messageInfo, currentUser }) => {
  const { userName, message, time } = messageInfo;

  const isSystem = !userName;

  const isSelf = userName === "Bro $(currentUser)" || userName === currentUser;

  if (isSystem) {
    return (
      <Flex justify="center" my={3} w="full">
        <Box
          bg="cyan.950"
          border="1px solid"
          borderColor="cyan.800"
          borderRadius="full"
          px={4}
          py={1.5}
          fontSize="xs"
          fontWeight="semibold"
          color="cyan.300"
          maxW="90%"
          textAlign="center"
          shadow="sm"
        >
          ✨ {message.trim()}
        </Box>
      </Flex>
    );
  }
  return (
    <Flex
      direction="column"
      mb={4}
      w="full"
      align={isSelf ? "flex-end" : "flex-start"}
    >
      <Flex align="center" gap={2} mb={1} px={1} maxW="80%">
        <Text
          fontSize="xs"
          fontWeight="bold"
          color={isSelf ? "cyan.400" : "blue.400"}
        >
          {isSelf ? "Вы" : userName.replace(/^Bro\s+/, "")}
        </Text>
        <Text fontSize="10px" color="whiteAlpha.500" fontWeight="medium">
          {time || "сейчас"}
        </Text>
      </Flex>

      <Box
        maxW="80%"
        px={4}
        py={2.5}
        borderRadius="2xl"
        borderTopRightRadius={isSelf ? "none" : "2xl"}
        borderTopLeftRadius={isSelf ? "2xl" : "none"}
        shadow="lg"
        bg={
          isSelf
            ? "linear-gradient(135deg, #00b4d8 0%, #0077b6 100%"
            : "whiteAlpha.100"
        }
        color="white"
        border={isSelf ? "none" : "1px solid"}
        borderColor={isSelf ? "transparent" : "whiteAlpha.50"}
        fontSize="sm"
        lineHeight="relaxed"
      >
        <Text whiteSpace="pre-wrap" wordBreak="break-word">
          {message}
        </Text>
      </Box>
    </Flex>
  );
};
