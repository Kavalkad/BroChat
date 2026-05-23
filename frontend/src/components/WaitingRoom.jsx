import {
  Button,
  Text,
  Input,
  Heading,
  Box,
  Flex,
  Icon,
  Stack,
  Field,
} from "@chakra-ui/react";
import { useState } from "react";
import { LuUser, LuHash, LuArrowRight } from "react-icons/lu";

export const WaitingRoom = ({ joinChat }) => {
  const [userName, setUserName] = useState("");
  const [chatRoom, setChatRoom] = useState("");

  const isValid = userName.trim() && chatRoom.trim();
  const onSubmit = (e) => {
    e.preventDefault();
    joinChat(userName, chatRoom);
  };

  return (
    <div className="min-h-screen bg-[#0f1117] flex items-center justify-center p-6">
      <Box
        w="full"
        maxW="400px"
        rounded="2xl"
        owerflow="hidden"
        shadow="2xl"
        borderWidth="1px"
        borderColor="whiteAlpha.100"
      >
        <Flex
          bgGradient="to-r"
          gradientFrom="cyan.900"
          gradientVia="blue.950"
          gradientTo="indigo.950"
          borderBottomWidth="1px"
          borderColor="whiteAlpha.100"
          px={7}
          py={5}
          allign="center"
          gap={3}
        >
          <div>
            <Heading size="sm" color="white" letterSpacing="tight">
              Начать общение со своими бро
            </Heading>
            <Text fontSize="xs" color="gray.500" mt="1px">
              Войдите в чатик
            </Text>
          </div>
        </Flex>

        <Box bg="#13151f" px={7} py={6}>
          <form onSubmit={onSubmit}>
            <Stack gap={5}>
              <Field.Root>
                <Field.Label>
                  <span className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-widest mb-1">
                    <Icon color="slate.500" boxSize={3}>
                      <LuUser />
                    </Icon>
                    Username
                  </span>
                </Field.Label>
                <Input
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Username"
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
              </Field.Root>

              <Field.Root>
                <Field.Label>
                  <span className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-widest mb-1">
                    <Icon color="slate.500" boxSize={3}>
                      <LuHash />
                    </Icon>
                    ChatRoom
                  </span>
                </Field.Label>
                <Input
                  value={chatRoom}
                  onChange={(e) => setChatRoom(e.target.value)}
                  placeholder="Название чатика"
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
              </Field.Root>
              <Button
                type="submit"
                size="md"
                width="full"
                mt={1}
                disabled={!isValid}
                className={[
                  "rounded-xl font-semibold text-sm transition-all duration-200 cursor-pointer",
                  isValid
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-lg shadow-cyan-500/20"
                    : "bg-white/5 text-white/25 cursor-not-allowed",
                ].join(" ")}
              >
                <span className="flex item-center gap-2">
                  Зайти к своим бро в чатик
                  <Icon boxSize={4}>
                    <LuArrowRight />
                  </Icon>
                </span>
              </Button>
            </Stack>
          </form>
        </Box>
      </Box>
    </div>
  );
};
