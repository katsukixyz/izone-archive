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
  Icon,
  Stack,
  Flex,
} from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import { BsGithub } from "react-icons/bs";

const Information: React.FC = () => {
  const { t } = useTranslation("information");
  return (
    <Box>
      <Head>
        <title>Information</title>
        <meta property="og:site_name" content="IZ*ONE VLIVE Archive" />
      </Head>
      <Center p={6}>
        <Flex
          p="6"
          flexDir="column"
          w="1000px"
          borderRadius="6"
          boxShadow="0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
        >
          <Heading mb="2">{t("heading")}</Heading>
          <Stack direction="column">
            <Text fontSize="2xl" fontWeight="semibold" mb="2">
              {t("faq.heading")}
            </Text>
            <Box mb="2">
              <Accordion allowToggle allowMultiple>
                <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <Box flex="1" textAlign="left">
                        {t("faq.1.q")}
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
                    {t("faq.1.a")}
                  </AccordionPanel>
                </AccordionItem>

                <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <Box flex="1" textAlign="left">
                        {t("faq.2.q")}
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
                    {t("faq.2.a")}
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </Box>

            <Text fontSize="2xl" fontWeight="semibold" mb="2">
              {t("issues.heading")}
            </Text>
            <Box mb="2">
              <Text>{t("issues.description")}</Text>
            </Box>
            <Text fontSize="2xl" fontWeight="semibold">
              {t("misc.heading")}
            </Text>
            <Box>
              <Text>{t("misc.description")}</Text>
            </Box>
          </Stack>
          <Center mt={5}>
            <Link
              href="https://github.com/katsukixyz/izone-archive"
              target="_blank"
              rel="noopener noreferrer"
              _hover={{
                cursor: "pointer",
                color: "brand.500",
                transition: "0.3s",
              }}
            >
              <Icon as={BsGithub} w={6} h={6} />
            </Link>
          </Center>
        </Flex>
      </Center>
    </Box>
  );
};

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["main", "information"])),
    },
  };
}

export default Information;
