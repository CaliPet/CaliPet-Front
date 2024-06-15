import { ButtonBrown } from '@/components/buttonBrown';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { t } from "i18next";

interface BlogProps {
  id?: string;
  title: string;
  titleContent: string;
  materials?: string[];
  imgUrl: string;
  category: string[];
  text: string[];
  message: string;
}

interface ContentPageParams extends Record<string, string | undefined> {
  id: string;
}

export function ContentBlog() {
  const { id } = useParams<ContentPageParams>();
  const [blog, setBlog] = useState<BlogProps>();
  const { i18n } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      const url = i18n.language === 'pt' ? '/ptBlog.json' : '/enBlog.json';
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Connection response was not ok');
        }
        const jsonData = await response.json();
        const newInfo = jsonData.find((el: { id: string | undefined; }) => el.id == id)
        setBlog(newInfo);
        console.log(newInfo)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [i18n.language, id]);


  return (
    <>
      <section className='w-full px-10 pt-32 bg-creme flex items-center justify-center flex-col gap-5 pb-10'>
        <div className='max-w-[1200px] w-full flex gap-8 justify-between items-center flex-col'>
          <h2 className='font-bungee text-xl md:text-3xl text-center text-light-brown-500'>{blog?.titleContent}</h2>
          <div className='flex gap-10 items-center flex-col md:flex-row'>
            <Card className="border-none rounded overflow-hidden">
              <CardHeader className="relative p-0 space-y-0">
                <CardTitle
                  style={{
                    '--image-url': `url("${blog?.imgUrl}")`,
                    backgroundImage: 'var(--image-url)',
                  } as React.CSSProperties}
                  className="card-title font-bungee font-medium flex items-end justify-center text-zinc-100 text-lg w-[350px] h-[350px] bg-cover bg-center"
                >
                  <span className="w-full text-center p-1 bg-zinc-950 bg-opacity-90 rounded-t-xl">
                    {blog?.title}
                  </span>
                </CardTitle>
              </CardHeader>
            </Card>
            {
              blog?.materials ?
                (<div className='flex flex-col gap-5'>
                  <h3 className='font-bungee text-3xl'>Materiais:</h3>
                  <ul className='list-inside list-disc flex flex-col gap-1'>
                    {
                      blog?.materials?.map(el => (
                        <li>{el}</li>
                      ))
                    }
                  </ul>
                </div>) : null
            }
          </div>
        </div>

        <div className='flex flex-col gap-5 w-full lg:w-4/5'>
          <ul className='list-inside list-disc flex flex-col gap-1'>
            {
              blog?.text.map(el => (
                <li>{el}</li>
              ))
            }
          </ul>
        </div>

        <div className='flex flex-col gap-5 w-full lg:w-4/5'>
          <h3 className='font-bungee text-light-brown-500'>{t(`${blog?.message}`)}</h3>

          <div className='flex justify-center gap-10'>
            <Link to='/feed'>
              <ButtonBrown children={t('pages.blog.btn.feed')} />
            </Link>
            <Link to='/blog'>
              <ButtonBrown children="CaliBlog" />
            </Link>
          </div>
        </div>

      </section>
    </>
  )
}