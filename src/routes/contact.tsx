import {
  Card,
  CardContent,
  CardFooter
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useTranslation } from 'react-i18next';

export function Contact() {
  const { t } = useTranslation();
 
  return (
    <div className="h-screen bg-creme bg-[url('/paw_path.png')] bg-left bg-repeat-x">
      <Card className="w-full m-0 p-2 bg-varOrange rounded-sm fixed left-[50%] top-[50%] z-50 max-w-sm md:max-w-md translate-x-[-50%] translate-y-[-50%]">
        <CardContent className="p-2 w-full flex flex-col items-center gap-5">
          <h2 className="font-bungee text-center text-3xl text-zinc-100">{t('pages.talkUs.title')}</h2>
          <Input id="subject" name="subject" type="text" placeholder={t('pages.talkUs.input1')} className="w-full ring-1 focus-visible:ring-1 focus-visible:ring-offset-0" />
          <Textarea id="message" name="message" placeholder={t('pages.talkUs.input2')} className="resize-none w-full ring-1 focus-visible:ring-1 focus-visible:ring-offset-0" />
        </CardContent>
        <CardFooter className="p-2">
          <Button className="w-full bg-light-brown-500 hover:bg-light-brown">{t('pages.talkUs.btnSend')}</Button>
        </CardFooter>
      </Card>
    </div>
  )
}