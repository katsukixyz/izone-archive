import React from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import {
  Text,
  Box,
  Heading,
  Tag,
  Link,
  Center,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";

const Information: React.FC = () => {
  return (
    <Box p="4">
      <Head>
        <title>Information</title>
        <meta property="og:site_name" content="IZ*ONE VLIVE Archive" />
      </Head>
      <Center>
        <Box
          p="6"
          maxW="1000"
          borderRadius="6"
          boxShadow="0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
        >
          <Heading mb="2">Information</Heading>
          <Text fontSize="2xl" fontWeight="semibold" mb="2">
            FAQ
          </Text>
          <Box mb="2">
            <Accordion allowToggle allowMultiple>
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      Will this site go offline if VLIVE services are
                      terminated?
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel
                  pb={3}
                  ml={2}
                  borderColor="gray.300"
                  borderLeftWidth={2}
                >
                  {
                    "No, this site will remain operational regardless of VLIVE status. The site runs independently of VLIVE's servers."
                  }
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      Does the archive include deleted VLIVEs?
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel
                  pb={3}
                  ml={2}
                  borderColor="gray.300"
                  borderLeftWidth={2}
                >
                  {`Yes, use the filter by tags option and select the "Deleted" tag.`}
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </Box>

          <Text fontSize="2xl" fontWeight="semibold" mb="2">
            Report issues/feature suggestions
          </Text>
          <Box mb="2">
            <Text>
              Create a new issue on the{" "}
              <Link
                href="https://github.com/katsukixyz/izone-archive/issues"
                isExternal
                _hover={{ textDecoration: "none" }}
              >
                <Tag _hover={{ color: "brand.500", transition: "0.3s" }}>
                  GitHub repository
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
                  GitHub
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

export default Information;
