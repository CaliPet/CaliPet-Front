import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // Import i18next
import { t } from "i18next";
import { CurrencyDollar, Timer } from '@phosphor-icons/react';

interface FoodProps {
  id?: string;
  name: string;
  ingredients: string[];
  methodOfPreparation: string[];
  imgUrl: string;
  category: string[];
  cost: string;
  preparationTime: string;
}

interface ContentPageParams extends Record<string, string | undefined> {
  id: string;
}

export function ContentFood() {
  const { id } = useParams<ContentPageParams>();
  const [food, setFood] = useState<FoodProps>();
  const { i18n } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      const url = i18n.language === 'pt' ? '/ptFeeding.json' : '/enFeeding.json';
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Connection response was not ok');
        }
        const jsonData = await response.json();
        const newInfo = jsonData.find((el: { id: string | undefined; }) => el.id == id)
        setFood(newInfo);
        console.log(newInfo)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [i18n.language, id]);

  return (
    <>
      <section className='min-h-screen w-full px-5 md:px-10 pt-32 bg-creme flex items-center justify-start flex-col gap-5 pb-10'>
        <div className='max-w-[1200px] w-full flex gap-8 items-center md:items-start justify-between flex-col-reverse md:flex-row'>
          <div id="left" className='flex flex-col gap-5'>
            <div className='flex flex-col gap-5'>
              <h2 className='font-bungee text-xl md:text-3xl'>{t('pages.contentFeeding.titleOne')}:</h2>
              <ul className='list-inside list-disc flex flex-col gap-1'>
                {
                  food?.ingredients.map((food, index) => (
                    <li key={index}>{food}</li>
                  ))
                }
              </ul>
            </div>
            <div className='max-w-[1200px] w-full flex flex-col gap-5'>
              <h2 className='font-bungee text-xl md:text-3xl'>{t('pages.contentFeeding.titleTwo')}:</h2>
              <ul className='list-inside list-disc flex flex-col gap-1'>
                {
                  food?.methodOfPreparation.map(food => (
                    <li>{food}</li>
                  ))
                }
              </ul>
            </div>
          </div>

          <div id="right" className='flex flex-col gap-5 w-full md:w-[300px]'>
            <Card className="flex bg-transparent shadow-none justify-center border-none rounded overflow-hidden">
              <CardHeader className="border-none relative p-0 space-y-0">
                <CardTitle
                  style={{
                    '--image-url': `url("${food?.imgUrl}")`,
                    backgroundImage: 'var(--image-url)',
                  } as React.CSSProperties}
                  className="card-title font-bungee font-medium flex items-end justify-center text-zinc-100 text-lg w-[300px] h-[300px] bg-cover bg-center"
                >
                  <div className="absolute top-0 left-0 bg-light-brown-900 p-2 flex flex-col gap-2 rounded-e-2xl">
                    {
                      food?.category.map(el => {
                        if (el.includes('cat')) return <img className="w-6" src="/feedingImages/catIconW.png" alt="" />
                        if (el.includes('dog')) return <img className="w-6" src="/feedingImages/dogIconW.png" alt="" />
                        if (el.includes('bird')) return <img className="w-6" src="/feedingImages/birdIconW.png" alt="" />
                      })
                    }
                  </div>
                  <span className="w-full text-center p-1 bg-zinc-950 bg-opacity-90 rounded-t-xl">
                    {food?.name}
                  </span>
                </CardTitle>
              </CardHeader>
            </Card>
            <div className='flex flex-col gap-2'>
              <span className='flex gap-2 items-center text-lg md:text-xl'>
                <Timer size={32} />
                {food?.preparationTime}
              </span>
              <span className='flex gap-2 items-center text-lg md:text-xl'>
                <CurrencyDollar size={32} />
                {food?.cost}
              </span>
            </div>
            <div className='flex flex-col items-center'>
              <h3 className='font-bold'>{t('pages.contentFeeding.warningTitle')}:</h3>
              <p>
                {t('pages.contentFeeding.warning')}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
} 