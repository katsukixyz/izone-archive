import React, { useContext } from "react";
import LocaleContext from "../contexts/LocaleContext";
import Link from "next/link";
import { NextRouter, useRouter } from "next/router";
import {
  Box,
  Flex,
  Text,
  IconButton,
  Image,
  Button,
  Stack,
  Collapse,
  Icon,
  Link as ChakraLink,
  useColorModeValue, //used for dark mode (future?)
  useDisclosure,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  CloseIcon,
  SettingsIcon,
  InfoIcon,
} from "@chakra-ui/icons";
import { BiDonateHeart } from "react-icons/bi";

const CustomNav: React.FC = () => {
  const router = useRouter();
  const { isOpen, onToggle } = useDisclosure();
  const { locale, changeLocale } = useContext(LocaleContext);

  return (
    <Box>
      <Flex
        bg="gray.800"
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle="solid"
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align="center"
      >
        <Flex ml={{ base: -2 }} mb={1} display={{ base: "flex", md: "none" }}>
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"unstyled"}
            bg="gray.800"
            _hover={{ color: "gray.400", transition: "0.3s" }}
            color="gray.500"
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex
          flex={{ base: 1 }}
          mr={{ base: 6 }}
          justify={{ base: "center", md: "start" }}
        >
          <ChakraLink as={Link} href="/">
            <Image
              src="/logo.svg"
              w="44px"
              h="46px"
              _hover={{ cursor: "pointer" }}
            />
          </ChakraLink>
        </Flex>
        <Flex
          display={{ base: "none", md: "flex" }}
          flex={{ base: 1, md: 0 }}
          ml={10}
          justify="flex-end"
        >
          <DesktopNav
            locale={locale}
            changeLocale={changeLocale}
            router={router}
          />
        </Flex>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileMenu />
      </Collapse>
    </Box>
  );
};

const DesktopNav = ({
  locale,
  changeLocale,
  router,
}: {
  locale: string;
  changeLocale: () => void;
  router: NextRouter;
}) => {
  return (
    <Stack direction={"row"} spacing={6} align="center">
      <ChakraLink
        as={Link}
        href="/"
        locale={router.locale === "en" ? "ko" : "en"}
      >
        <Text
          color="gray.500"
          fontWeight="semibold"
          onClick={changeLocale}
          _hover={{
            cursor: "pointer",
          }}
        >
          {locale}
        </Text>
      </ChakraLink>
      <ChakraLink as={Link} href="/information">
        <InfoIcon
          color="gray.500"
          w={5}
          h={5}
          _hover={{
            textDecoration: "none",
            color: "gray.400",
            transition: "0.3s",
            cursor: "pointer",
          }}
        />
      </ChakraLink>
      <ChakraLink
        href="https://patreon.com/katsukixyz"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Icon
          as={BiDonateHeart}
          color="gray.500"
          w={6}
          h={6}
          _hover={{
            textDecoration: "none",
            color: "gray.400",
            transition: "0.3s",
            cursor: "pointer",
          }}
        />
      </ChakraLink>
      <ChakraLink as={Link} href="/pref">
        <SettingsIcon
          color="gray.500"
          w={5}
          h={5}
          _hover={{
            textDecoration: "none",
            color: "gray.400",
            transition: "0.3s",
            cursor: "pointer",
          }}
        />
      </ChakraLink>
    </Stack>
  );
};

const MobileMenu = () => {
  return (
    <Stack bg="white" p={4} display={{ md: "none" }}>
      <ChakraLink as={Link} href="/information">
        <Text
          fontSize="md"
          fontWeight={600}
          color="gray.600"
          _hover={{ cursor: "pointer" }}
        >
          Contact
        </Text>
      </ChakraLink>
      <a
        href="https://patreon.com/katsukixyz"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Text fontSize="md" fontWeight={600} color="gray.600" mt="2">
          Donate
        </Text>
      </a>
      <ChakraLink as={Link} href="/pref">
        <Text
          fontSize="md"
          fontWeight={600}
          color="gray.600"
          _hover={{ cursor: "pointer" }}
        >
          Preferences
        </Text>
      </ChakraLink>
    </Stack>
  );
};

export default CustomNav;
