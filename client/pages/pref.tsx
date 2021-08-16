import React, { useContext } from "react";
import AutoplayContext from "../contexts/AutoplayContext";
import {
  Box,
  Center,
  Flex,
  Heading,
  Switch,
  Tag,
  Text,
} from "@chakra-ui/react";
import { Stack } from "@chakra-ui/react";

const Pref: React.FC = () => {
  const { autoplay, toggleAutoplay } = useContext(AutoplayContext);

  return (
    <Center p="6">
      <Box
        p="6"
        w="1000px"
        borderRadius="6"
        boxShadow="0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
      >
        <Heading>User preferences</Heading>
        <Stack direction="column" mt="3">
          <Flex direction="row" justify="space-between" align="center">
            <Box d="flex" alignItems="baseline">
              <Tag size="lg">Autoplay</Tag>
              <Text ml="2">Play videos automatically on page load</Text>
            </Box>
            <Switch
              isChecked={autoplay}
              onChange={toggleAutoplay}
              size="md"
              colorScheme="brand"
            />
          </Flex>
        </Stack>
      </Box>
    </Center>
  );
};

export default Pref;
