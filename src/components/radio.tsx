import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface RadioBtnProps {
  items: { name: string; id: string; elementIndex: string }[];
}

export function RadioBtn({ items }: RadioBtnProps) {
  return (
    <RadioGroup defaultValue="option-one">
      {items.map((item, index) => (
        <div key={index} className="flex items-center space-x-2">
          <RadioGroupItem
            value={item.elementIndex}
            id={item.id}
            className="text-zinc-50 border-zinc-50"
          />
          <Label htmlFor={item.id} className="text-lg">
            {item.name}
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
}