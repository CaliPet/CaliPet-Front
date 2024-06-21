import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Section } from "@/components/section";
import { useTranslation } from "react-i18next";
import i18n from "@/lib/i18n";

export function About() {
  const { t } = useTranslation();

  const cardsOurPrinciples = [
    {
      title: "pages.about.principles.mission.title",
      description: "pages.about.principles.mission.description",
      imgUrl: "/about/catIcon.png",
    },
    {
      title: "pages.about.principles.value.title",
      description: "pages.about.principles.value.description",
      imgUrl: "/about/dogIcon.png",
    },
    {
      title: "pages.about.principles.vision.title",
      description: "pages.about.principles.vision.description",
      imgUrl: "/about/birdIcon.png",
    },
  ];

  const cardsVisualIdentity = [
    {
      title: "pages.about.visualIdentity.logo.title",
      imgUrl: "/about/logo.png",
      text: "pages.about.visualIdentity.logo.content.text",
      content: [
        "pages.about.visualIdentity.logo.content.list.item1",
        "pages.about.visualIdentity.logo.content.list.item2",
        "pages.about.visualIdentity.logo.content.list.item3",
      ],
      list: true,
    },
    {
      title: "pages.about.visualIdentity.name.title",
      imgUrl: "/about/nome.png",
      text: "pages.about.visualIdentity.name.content.text",
      content: [
        "pages.about.visualIdentity.name.content.list.item1",
        "pages.about.visualIdentity.name.content.list.item2",
        "pages.about.visualIdentity.name.content.list.item3",
      ],
      list: true,
    },
    {
      title: "pages.about.visualIdentity.slogan.title",
      imgUrl: "",
      text: "pages.about.visualIdentity.slogan.content.text",
      content: [
        "pages.about.visualIdentity.slogan.content.list.item1",
        "pages.about.visualIdentity.slogan.content.list.item2",
      ],
      list: false,
    },
  ];

  const cardsVisualIdentituColors = [
    {
      imgUrl: "/about/colorOrange.png",
      content: "pages.about.visualIdentity.colors.color1",
    },
    {
      imgUrl: "/about/colorCaramel.png",
      content: "pages.about.visualIdentity.colors.color2",
    },
    {
      imgUrl: "/about/colorCreme.png",
      content: "pages.about.visualIdentity.colors.color3",
    },
    {
      imgUrl: "/about/colorLightBrown.png",
      content: "pages.about.visualIdentity.colors.color4",
    },
  ];

  const laws = [
    {
      title: "pages.about.law.content.item1.title",
      content: "pages.about.law.content.item1.content",
    },
    {
      title: "pages.about.law.content.item2.title",
      content: "pages.about.law.content.item2.content",
    },
  ];

  return (
    <>
      {/*OUR PRINCIPLES SECTION*/}
      <Section
        idElement="our-principles"
        title={t("pages.about.principles.title")}
        colorTitle="text-caramel"
        bgColor="bg-creme"
      >
        <div className="flex justify-center lg:items-start flex-col m-0 max-w-7xl p-5 gap-10">
          {cardsOurPrinciples.map((el, index) => (
            <Card
              key={index}
              className="flex items-center flex-col md:flex-row bg-transparent border-transparent shadow-none gap-10"
            >
              <CardHeader className="p-0">
                <CardTitle>
                  <img
                    src={el.imgUrl}
                    alt="Imagem de um cachorro"
                    className="w-20"
                  />
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Popover>
                  <PopoverTrigger className="font-semibold font-bungee text-left text-xl md:text-3xl text-caramel hover:scale-105 transition">
                    {t(`${el.title}`)}
                  </PopoverTrigger>
                  <PopoverContent className="bg-creme">
                    {t(`${el.description}`)}
                  </PopoverContent>
                </Popover>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/*VISUAL IDENTITY SECTION*/}
      <Section
        idElement="visual-identity"
        title={t("pages.about.visualIdentity.title")}
        bgColor="bg-varOrange"
      >
        <div
            id="content-visual-identity"
            className="flex justify-center gap-5 w-full flex-wrap max-w-[950px]"
          >
            {cardsVisualIdentity.map((el, index) => (
              <Card
                key={index}
                className="flex flex-col border-none w-[300px] overflow-hidden hover:scale-105 transition text-lg p-5"
              >
                <CardHeader className="p-0 px-4">
                  <CardTitle className="text-center text-lg">
                    {t(`${el.title}`)}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Popover>
                    <PopoverTrigger
                      style={{
                        backgroundImage: `url(${el.imgUrl})`,
                      }}
                      className="bg-contain bg-center bg-no-repeat flex items-center h-[200px] w-full font-bungee text-center text-caramel text-lg"
                    >
                      {el.imgUrl == "" ? t(el.text) : null}
                    </PopoverTrigger>
                    <PopoverContent>
                      {el.imgUrl == "" ? null : <p>{t(`${el.text}`)}</p>}
                      <ul className="list-disc list-inside">
                        {el.content.map((el, index) => (
                          <li key={index}>{t(el)}</li>
                        ))}
                      </ul>
                    </PopoverContent>
                  </Popover>
                </CardContent>
              </Card>
            ))}
            <Card
              className={`flex lg:flex-1 flex-col border-none w-[300px] items-center justify-center overflow-hidden hover:scale-105 transition text-lg p-2`}
            >
              <CardHeader className="p-0 px-4">
                <CardTitle className="text-center text-lg">
                  {t("pages.about.visualIdentity.fonts.title")}
                </CardTitle>
              </CardHeader>
              <CardContent className="py-3 lg:flex text-center text-caramel text-xl gap-2">
                <Popover>
                  <PopoverTrigger className="text-center text-caramel text-lg font-medium">
                    <span className="font-bowlby">Bowbly One SC</span>,{" "}
                    <span className="font-bungee">Bungee</span>{" "}
                    {i18n.language == "pt" ? "e" : "and"} <span>Poppins</span>
                  </PopoverTrigger>

                  <PopoverContent className="flex flex-col gap-3">
                    <p>{t("pages.about.visualIdentity.fonts.content.text")}</p>
                    <ul className="list-disc list-inside">
                      <li>
                        {t(
                          "pages.about.visualIdentity.fonts.content.list.item1"
                        )}
                      </li>
                      <li>
                        {t(
                          "pages.about.visualIdentity.fonts.content.list.item2"
                        )}
                      </li>
                      <li>
                        {t(
                          "pages.about.visualIdentity.fonts.content.list.item3"
                        )}
                      </li>
                    </ul>
                  </PopoverContent>
                </Popover>
              </CardContent>
            </Card>
          </div>  
      </Section>

      {/*VISUAL IDENTITY COLORS SECTION*/}
      <Section
        idElement="visual-identity-colors"
        bgColor="bg-light-brown-900"
      >
        {cardsVisualIdentituColors.map((el, index) => (
          <Card
            key={index}
            className="bg-transparent border-transparent shadow-none hover:scale-105 transition"
          >
            <CardContent className="p-0 flex">
              <Popover>
                <PopoverTrigger
                  style={{
                    backgroundImage: `url(${el.imgUrl})`,
                  }}
                  className="bg-center bg-no-repeat h-[150px] w-[200px]"
                ></PopoverTrigger>
                <PopoverContent className="bg-creme">
                  {t(`${el.content}`)}
                </PopoverContent>
              </Popover>
            </CardContent>
          </Card>
        ))}
      </Section>

      {/*SDG SECTION*/}
      <Section
        idElement="ods"
        bgColor="bg-creme"
        title={t("pages.about.ods.title")}
        colorTitle="text-caramel"
      >
        {
          <div className="flex flex-col items-center gap-5 lg:flex-row">
            <img
              className="w-[180px] rounded"
              src={i18n.language == "pt" ? "/about/odsPt.png" : "/about/odsEn.png"}
              alt="imagem da nossa ODS"
            />
            <Card className="flex justify-center items-center flex-col  bg-transparent border-transparent shadow-none gap-2">
              <CardHeader className="p-0">
                <CardTitle className="font-semibold font-bungee text-xl md:text-3xl md:text-center text-light-brown-500 ">
                  {t("pages.about.ods.contentTitle")}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 md:w-4/5">
                <p>{t("pages.about.ods.content")}</p>
              </CardContent>
            </Card>
          </div>
        }  
      </Section>

      {/*LAWS SECTION*/}
      <Section
        idElement="laws"
        title={t("pages.about.law.title")}
        bgColor="bg-varOrange"  
      >
        {laws.map((el, index) => (
          <Card
            key={index}
            className="flex items-center flex-col bg-transparent border-transparent shadow-none gap-5"
          >
            <CardHeader className="p-0">
              <CardTitle className="font-medium font-bungee text-2xl md:text-4xl md:text-center text-creme">
                {t(`${el.title}`)}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 md:w-4/5 md:text-lg">
              <p>{t(`${el.content}`)}</p>
            </CardContent>
          </Card>
        ))}  
      </Section>
    </>
  );
}
