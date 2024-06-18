import {
  Carousel, CarouselContent, CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import {
  Card,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Autoplay from "embla-carousel-autoplay";

import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { t } from "i18next";


interface BlogProps {
  id: number;
  title: string;
  imgUrl: string;
  category: string[];
}

export function Blog() {
  const [blog, setBlog] = useState<BlogProps[] | []>([]);
  const { i18n } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      const url = i18n.language === 'pt' ? '/translate/ptBlog.json' : '/translate/enBlog.json';
      console.log('Fetching data from URL:', url); // Adicionado para debugging
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Connection response was not ok');
        }
        const jsonData = await response.json();
        console.log('Fetched data:', jsonData); // Adicionado para debugging
        setBlog(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [i18n.language]);

  const carouselItems = [
    {
      id: "cat",
      imgUrl: "/feedingImages/gatoFeeding.png",
      text1: "pages.blog.carousel.item1.text1",
      text2: "pages.blog.carousel.item1.text2",
      important: "pages.blog.carousel.item1.important",
    },
    {
      id: "dog",
      imgUrl: "/feedingImages/dogFeeding.png",
      text1: "pages.blog.carousel.item2.text1",
      text2: "pages.blog.carousel.item2.text2",
      important: "pages.blog.carousel.item2.important",
    },
    {
      id: "bird",
      imgUrl: "/feedingImages/birdFeeding.png",
      text1: "pages.blog.carousel.item3.text1",
      text2: "pages.blog.carousel.item3.text2",
      important: "pages.blog.carousel.item3.important",
    }
  ]

  const catalogedItems = [
    {
      title: "pages.blog.categories.item1",
      filter: "hits",
    },
    {
      title: "pages.blog.categories.item2",
      filter: "curiosity",
    },
    {
      title: "pages.blog.categories.item3",
      filter: "health",
    }
  ]

  return (
    <>
      <section className="bg-creme w-full pt-20 flex flex-col items-center">
        <Carousel className="max-w-[1200px] px-5 select-none"
          opts={{
            align: "center",
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 4000,
            }),
          ]}
        >
          <CarouselContent>
            {
              carouselItems.map((el, index) => (
                <CarouselItem key={index} className="flex justify-center">
                  <section className={`flex w-full items-center justify-center ${el.id != "cat" ? "flex-row-reverse" : null} lg:justify-between rounded bg-light-brown font-bungee text-zinc-50 text-xl sm:text-3xl lg:text-5xl`}>
                    <p className="w-3/4 px-3 text-center absolute lg:relative z-10">
                      {t(`${el.text1}`)} <span className="text-caramel">{t(`${el.important}`)}</span> {t(`${el.text2}`)}
                    </p>
                    <img
                      className="h-[250px] lg:block opacity-35 lg:opacity-100"
                      src={el.imgUrl}
                      alt="Uma imagem de um gato olhando para o texto a esquerda"
                    />
                  </section>
                </CarouselItem>
              ))
            }
          </CarouselContent>
        </Carousel>

        {
          catalogedItems.map(element => (
            <Carousel className="w-full max-w-[1200px] p-5">
              <h3 className="font-bungee">{t(`${element.title}`)}</h3>
              <CarouselContent className="md:-ml-4">
                {
                  blog
                    .filter(item => item.category.includes(element.filter))
                    .map((item) => (
                      <Link to={`/contentBlog/${item.id}`} key={item.id}>
                        <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                          <Card className="w-[250px] border-none rounded overflow-hidden hover:scale-105 transition">
                            <CardHeader className="relative p-0 space-y-0">
                              <CardTitle
                                style={{
                                  '--image-url': `url("${item.imgUrl}")`,
                                  backgroundImage: 'var(--image-url)',
                                } as React.CSSProperties}
                                className="card-title font-bungee font-medium flex items-end justify-center text-zinc-100 text-lg h-[200px] bg-cover bg-center"
                              >
                                <div className="absolute top-0 left-0 bg-light-brown-900 p-2 flex flex-col gap-2 rounded-e-2xl">
                                  {item.category.map(el => {
                                    if (el.includes('curiosity')) return <img className="w-6" src="/blog/confuso.png" alt="" key={el} />;
                                    if (el.includes('health')) return <img className="w-6" src="/blog/saude.png" alt="" key={el} />;
                                    if (el.includes('hits')) return <img className="w-6" src="/blog/ideia.png" alt="" key={el} />;
                                    return null; // Handle other categories if needed
                                  })}
                                </div>
                                <span className="w-full text-center p-1 bg-zinc-950 bg-opacity-90 rounded-t-xl">
                                  {item.title}
                                </span>
                              </CardTitle>
                            </CardHeader>
                          </Card>
                        </CarouselItem>
                      </Link>
                    ))

                }
              </CarouselContent>
              <CarouselPrevious className="hidden lg:inline-flex" />
              <CarouselNext className="hidden lg:inline-flex" />
            </Carousel>
          ))
        }
      </section >
    </>
  );
}