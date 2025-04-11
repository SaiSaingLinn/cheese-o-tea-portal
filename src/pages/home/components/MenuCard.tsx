import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

type MenuCardProps = {
  item: {
    id: string;
    name: string;
    description?: string;
    price: number;
    imageUrl?: string;
  };
  cat: {
    id: string;
    name: string;
  };
  handleOrderNow: (catId: string, itemId: string) => void;
};

export default function MenuCard({ item, cat, handleOrderNow }: MenuCardProps) {
  return (
    <div key={item?.id}>
      <div className="flex items-start gap-4 flex-col">
        <div className="flex justify-between w-full gap-4">
          <div className="flex-1">
            <div className="font-semibold text-base">{item?.name}</div>
            <div className="font-medium text-red-500 mt-1">
              {item?.price.toLocaleString()} Ks
            </div>
            <div className="text-sm text-gray-600">{item?.description}</div>
          </div>
          <div>
            <img
              src={
                item?.imageUrl ||
                `https://placehold.co/150/FFEE00/000000?text=${item?.name}`
              }
              alt={item?.name}
              className="w-24 rounded object-cover"
            />
          </div>
        </div>
        <div className="flex justify-end w-full">
          <Button
            onClick={() => handleOrderNow(cat.id, item?.id)}
            className="rounded-full font-rubik"
          >
            ORDER NOW
          </Button>
        </div>
      </div>
      <Separator className="my-4" />
    </div>
  );
}
