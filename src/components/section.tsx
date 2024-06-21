import { useTranslation } from 'react-i18next';

interface SectionProps {
  idElement: string;
  title?: string;
  bgColor?: string;
  colorTitle?: string;
  children: React.ReactNode;
}

export function Section({ children, idElement, title, bgColor, colorTitle = 'text-zinc-100' }: SectionProps) {
  const { t } = useTranslation();

  return (
    <section
      id={idElement}
      className={`flex items-center justify-center flex-col w-full lg:h-screen ${bgColor} p-12 gap-10`}
    >
      {
        title ? (<h2 className={`font-bungee text-center text-4xl ${colorTitle} lg:text-5xl pt-10 `}>
          {t(`${title}`)}
        </h2>) : null 
      }

      <div className="flex items-center md:justify-between flex-col md:flex-row w-full md:m-0 max-w-7xl ">
        <div
          id="content-feeding"
          className="flex justify-evenly gap-5 w-full flex-wrap"
        >
          {children}
        </div>
      </div>
    </section>
  );
}
