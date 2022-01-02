import React, { useContext } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import AutoplayContext from "../contexts/AutoplayContext";
import {
  Box,
  Center,
  Flex,
  Heading,
  Switch,
  Tag,
  Select,
  Text,
} from "@chakra-ui/react";
import { Stack } from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import LocaleContext from "../contexts/LocaleContext";
import { useRouter } from "next/router";

const Pref: React.FC = () => {
  const { t, i18n } = useTranslation("pref");
  const { autoplay, toggleAutoplay } = useContext(AutoplayContext);
  const { changeLocale } = useContext(LocaleContext);
  const router = useRouter();

  return (
    <Box>
      <Head>
        <title>Preferences</title>
      </Head>
      <Center p="6">
        <Box
          p="6"
          w="1000px"
          borderRadius="6"
          boxShadow="0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
        >
          <Heading>{t("heading")}</Heading>
          <Stack direction="column" mt="3">
            <Flex
              display={{ base: "inherit", md: "none" }}
              direction="row"
              justify="space-between"
              align="center"
            >
              <Box d="flex" alignItems="baseline">
                <Tag size="lg">{t("language.label")}</Tag>
              </Box>
              <Box w={20}>
                <Select
                  size="sm"
                  defaultValue={i18n.language}
                  onChange={(e) => {
                    router.push(router.pathname, router.asPath, {
                      locale: e.target.value,
                    });
                    changeLocale();
                  }}
                >
                  <option>en</option>
                  <option>ko</option>
                </Select>
              </Box>
            </Flex>
            <Flex direction="row" justify="space-between" align="center">
              <Box d="flex" alignItems="baseline">
                <Tag size="lg">{t("autoplay.label")}</Tag>
                <Text display={{ base: "none", md: "inherit" }} ml="2">
                  {t("autoplay.description")}
                </Text>
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
    </Box>
  );
};

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["main", "pref"])),
    },
  };
}

export default Pref;
