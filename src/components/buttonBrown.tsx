import { Button } from "@/components/ui/button";

export function ButtonBrown({ children }: { children: React.ReactNode }) {
  return <Button className="w-full bg-light-brown-500 hover:bg-light-brown">{children}</Button>
}