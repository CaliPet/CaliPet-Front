import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function ErrorPage() {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-creme text-zinc-800 font-semibold gap-3">
      <h2 className="font-bungee text-caramel text-9xl">404!</h2>
      <p>Desculpe, Aumigo, pelo visto essa página está fora do ar :( </p>
      <p>Estamos voando para arrumar isso!</p>
      <p>Que tal voltar para a Home?</p>
      <Button className="bg-light-brown-500 hover:bg-light-brown">
        <Link to="/">Home</Link>
      </Button>
    </div>
  )
}