import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CardImage } from "@/components/cardImage";
import { Section } from "@/components/section";
import { ButtonBrown } from "@/components/buttonBrown";
import { Link } from "react-router-dom";

import { Check, InstagramLogo, LinkedinLogo, X } from "@phosphor-icons/react";
import { useTranslation } from "react-i18next";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

export function Home() {
  const cardsFeeding = [
    {
      spanText: "pages.home.feeding.cardDog.title",
      descriptionText: "pages.home.feeding.cardDog.description",
      imgUrl: "/home/cardImgDog.png",
    },
    {
      spanText: "pages.home.feeding.cardCat.title",
      descriptionText: "pages.home.feeding.cardCat.description",
      imgUrl: "/home/cardImgCat.png",
    },
    {
      spanText: "pages.home.feeding.cardBird.title",
      descriptionText: "pages.home.feeding.cardBird.description",
      imgUrl: "/home/cardImgBird.png",
    },
  ];

  const cardsPlans = [
    {
      title: "pages.home.plans.cardLittleFriend.title",
      price: "pages.home.plans.cardLittleFriend.price",
      description: [
        {
          text: "pages.home.plans.cardsDescription.benefit1",
          icon: <Check size={20} className="text-varOrange" weight="bold" />,
        },
        {
          text: "pages.home.plans.cardsDescription.benefit2",
          icon: <X size={20} className="text-varOrange" weight="bold" />,
        },
        {
          text: "pages.home.plans.cardsDescription.benefit3",
          icon: <X size={20} className="text-varOrange" weight="bold" />,
        },
      ],
    },
    {
      title: "pages.home.plans.cardFriend.title",
      price: "pages.home.plans.cardFriend.price",
      description: [
        {
          text: "pages.home.plans.cardsDescription.benefit1",
          icon: <Check size={20} className="text-varOrange" weight="bold" />,
        },
        {
          text: "pages.home.plans.cardsDescription.benefit2",
          icon: <Check size={20} className="text-varOrange" weight="bold" />,
        },
        {
          text: "pages.home.plans.cardsDescription.benefit3",
          icon: <X size={20} className="text-varOrange" weight="bold" />,
        },
      ],
    },
    {
      title: "pages.home.plans.cardBigFriend.title",
      price: "pages.home.plans.cardBigFriend.price",
      description: [
        {
          text: "pages.home.plans.cardsDescription.benefit1",
          icon: <Check size={20} className="text-varOrange" weight="bold" />,
        },
        {
          text: "pages.home.plans.cardsDescription.benefit2",
          icon: <Check size={20} className="text-varOrange" weight="bold" />,
        },
        {
          text: "pages.home.plans.cardsDescription.benefit3",
          icon: <Check size={20} className="text-varOrange" weight="bold" />,
        },
      ],
    },
  ];

  const { t } = useTranslation();

  return (
    <>
      {/*HERO SECTION*/}
      <Section idElement="hero" bgColor="bg-creme">
        <div className="flex items-center md:justify-between flex-col md:flex-row w-full md:h-screen mt-32 md:m-0 max-w-7xl p-5 ">
          <div
            id="left"
            className="flex flex-col gap-3 md:w-[550px] items-center md:items-start"
          >
            <h3 className="font-bold text-lg text-light-brown-500 lg:text-2xl">
              {t("pages.home.hero.welcome")}
            </h3>
            <h2 className="font-bungee text-center md:text-left text-3xl text-zinc-950 lg:text-5xl">
              {t("pages.home.hero.text.part1")}{" "}
              <span className="text-caramel">
                {t("pages.home.hero.text.especial")}
              </span>{" "}
              {t("pages.home.hero.text.part2")}
            </h2>
            <Link className="w-full" to="/feed">
              <ButtonBrown>{t("pages.home.hero.btnCardText")}</ButtonBrown>
            </Link>
          </div>
          <div id="right" className="flex justify-center">
            <img
              src="/home/hero.png"
              alt="Imagem da Hero"
              className="w-4/5"
            />
          </div>
        </div>
      </Section>

      {/*FEED SECTION*/}
      <Section
        idElement="feeding"
        title="pages.home.feeding.title"
        bgColor="bg-varOrange"
      >
        {cardsFeeding.map((card, index) => (
          <CardImage
            key={index}
            textButton={t("pages.home.feeding.btnCardText")}
            descriptionText={t(`${card.descriptionText}`)}
            spanText={t(`${card.spanText}`)}
            imgUrl={card.imgUrl}
          />
        ))}
      </Section>

      {/*PLANS SECTION*/}
      <Section
        idElement="plans"
        title="pages.home.plans.title"
        bgColor="bg-creme"
        colorTitle="text-caramel"
      >
        {cardsPlans.map((card, index) => (
          <Card
            key={index}
            className="relative border-zinc-100 bg-zinc-50 h-64 flex items-center justify-center flex-col shadow-[0_1px_15px_2px_rgba(241,126,19,0.9)] w-[300px] overflow-hidden hover:scale-105 transition"
          >
            <img
              src="/home/paw.png"
              alt="paw"
              className="absolute h-4/5 opacity-30 blur-[7px]"
            />
            <CardHeader className="p-0 ">
              <CardTitle className="font-bungee flex items-end justify-center text-light-brown-500 text-xl z-10">
                {t(`${card.title}`)}
              </CardTitle>
              <CardDescription className="text-center font-semibold text-light-brown z-10">
                {t(`${card.price}`)}
              </CardDescription>
            </CardHeader>
            <CardContent className="py-3">
              <ul>
                {card.description.map((description, index) => (
                  <li key={index} className="flex items-center gap-2 z-10">
                    <span>{description.icon}</span>
                    {t(`${description.text}`)}
                  </li>
                ))}
              </ul>
            </CardContent>
            {card.title == "pages.home.plans.cardLittleFriend.title" ? null : (
              <CardFooter className="p-0 w-4/5 z-10">
                <Link className="w-full" to="/login">
                  <ButtonBrown>{t("pages.home.plans.btnCardText")}</ButtonBrown>
                </Link>
              </CardFooter>
            )}
          </Card>
        ))}
      </Section>

      {/*BLOG SECTION*/}
      <Section
        idElement="blog"
        title="pages.home.blog.title"
        bgColor="bg-varOrange"
      >
        <img
          src="/home/parrot.png"
          alt="Papagaio"
          className="w-full md:w-[470px]"
        />
        <div
          id="blog-content"
          className="flex flex-col justify-evenly gap-5 md:w-[600px]"
        >
          <h2 className="font-bungee text-center text-zinc-100 text-xl lg:text-3xl">
            {t("pages.home.blog.subtitle")}
          </h2>
          <p className="text-zinc-950 text-md md:text-xl text-center">
            {t("pages.home.blog.text")}
          </p>
          <Link className="w-full" to="/blog">
            <ButtonBrown>{t("pages.home.blog.btnCardText")}</ButtonBrown>
          </Link>
        </div>
      </Section>

      {/*SOCIAL SECTION*/}
      <Section
        idElement="social"
        title="pages.home.medias.title"
        bgColor="bg-creme"
        colorTitle="text-caramel"
      >
        <div className="flex items-center md:justify-center flex-col md:flex-row w-full md:m-0 max-w-7xl gap-10">
          <img
            src="/home/curiousCat.png"
            alt="Papagaio"
            className="w-full md:w-[470px] md:h-[400px]"
          />
          <div id="social-content" className="flex flex-col gap-5 md:w-[600px]">
            <h2 className="font-bungee text-center text-caramel text-xl lg:text-3xl">
              {t("pages.home.medias.subtitle")}
            </h2>
            <p className="text-zinc-950 text-md md:text-xl text-center">
              {t("pages.home.medias.text")}
            </p>
            <div
              id="social-icons"
              className="flex items-center justify-center gap-5"
            >
              <a
                href="https://www.linkedin.com/company/grupocalipet/"
                target="_blank"
              >
                <LinkedinLogo className="w-10 h-10 text-caramel hover:scale-105 transition" />
              </a>
              <a href="https://www.instagram.com/calipet.blog/" target="_blank">
                <InstagramLogo className="w-10 h-10 text-caramel hover:scale-105 transition" />
              </a>
            </div>
          </div>
        </div>
      </Section>

      {/*PARTNERS SECTION*/}
      <Section idElement="partners" bgColor="bg-varOrange" title={t('pages.home.partners.title')}>
        <Carousel
          opts={{
            align: "center",
            loop: true,
          }}
        >
          <CarouselContent>
            <CarouselItem>
              <a href="https://saboria-three.vercel.app/" target="_blank">
                <img className="sm:w-1/2 m-auto" src="/home/saborIA.png" alt="SaborIA Link" />
              </a>
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      </Section>

      {/*RIGHTS SECTION*/}
      <Section idElement="rights" bgColor="bg-creme">
        <div className="flex items-center justify-center flex-col w-full md:m-0 max-w-7xl">
          <img src="/home/logoColorful.png" alt="Logo CaliPet" />
          <h2 className="font-bungee text-center text-caramel text-xl lg:text-3xl">
            {t("pages.home.rights.slogan")}
          </h2>
          <p className="text-zinc-950 text-md text-center">
            {t("pages.home.rights.terms")}
          </p>
        </div>
      </Section>
    </>
  );
}
