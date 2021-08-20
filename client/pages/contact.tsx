import React from "react";
import Head from "next/head";
import { Text, Box, Heading, Tag, Link, Center } from "@chakra-ui/react";

const Contact: React.FC = () => {
  return (
    <Box p="4">
      <Head>
        <title>Contact</title>
        <meta property="og:site_name" content="IZ*ONE VLIVE Archive" />
      </Head>
      <Center>
        <Box
          p="6"
          maxW="1000"
          borderRadius="6"
          boxShadow="0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
        >
          <Heading mb="2">Contact</Heading>

          <Text fontSize="2xl" fontWeight="semibold" mb="2">
            Report issues/feature suggestions
          </Text>
          <Box>
            <Text>
              Create a new issue on the{" "}
              <Link
                href="https://github.com/katsukixyz/izone-archive/issues"
                isExternal
                _hover={{ textDecoration: "none" }}
              >
                <Tag _hover={{ color: "brand.500", transition: "0.3s" }}>
                  Github repository
                </Tag>
              </Link>{" "}
              with the relevant details and reproduction methods and it will be
              dealt with promptly.
            </Text>
          </Box>
          <Text fontSize="2xl" fontWeight="semibold">
            Miscellaneous
          </Text>
          <Box>
            <Text>
              For any miscellaneous questions, either leave an issue on{" "}
              <Link
                href="https://github.com/katsukixyz/izone-archive/issues"
                isExternal
                _hover={{ textDecoration: "none" }}
              >
                <Tag _hover={{ color: "brand.500", transition: "0.3s" }}>
                  Github
                </Tag>
              </Link>{" "}
              or email me at{" "}
              <Link
                href="mailto:katsukidotxyz@gmail.com"
                isExternal
                _hover={{ textDecoration: "none" }}
              >
                <Tag _hover={{ color: "brand.500", transition: "0.3s" }}>
                  katsukidotxyz@gmail.com
                </Tag>
              </Link>
              .
            </Text>
          </Box>
        </Box>
      </Center>
    </Box>
  );
};

export default Contact;
