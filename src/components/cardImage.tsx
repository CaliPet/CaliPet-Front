import { ButtonBrown } from "./buttonBrown"

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Link } from "react-router-dom";

interface CardImageProps {
  textButton?: string;
  descriptionText: string;
  spanText: string;
  imgUrl: string;
}

export function CardImage({ textButton, descriptionText, spanText, imgUrl }: CardImageProps) {
  return (
    <Card className="flex flex-col justify-between border-none w-72 overflow-hidden transition-transform transform hover:scale-105">
      <CardHeader className="p-0">
        <CardTitle
          className="card-title font-bungee flex items-end justify-center text-caramel text-xl"
          style={{
            backgroundImage: `url(${imgUrl})`,
            height: '200px',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          }}
        >
          <span className="w-full text-center p-1 bg-zinc-950 bg-opacity-90 rounded-t-xl">
            {spanText}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="py-3">
        <p>{descriptionText}</p>
      </CardContent>
      <CardFooter className="py-2 px-5">
        <Link className="w-full" to='/feed'>
          <ButtonBrown>{textButton}</ButtonBrown>
        </Link>
      </CardFooter>
    </Card>
  );
}