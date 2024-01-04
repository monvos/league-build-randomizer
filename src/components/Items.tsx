import { useState } from "react";
import { ItemsData } from "../utility/types";


interface Props {
  items: ItemsData[];
  version: string;
}



function Items({ items, version }: Props) {
  const [isHovering, setIsHovering] = useState<string>('');

  return (
    <>
      <div className="flex flex-wrap xl:flex-nowrap gap-2 xl:gap-0 xl:space-x-5 w-[80%] xl:w-[100%] mb-7">
        {items.map((item, i) => (
          <div key={item.name} className="relative">
            <img
              src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${item.image.full}`}
              alt={item.name}
              className={`${i === 1 ? 'border-orange-500' : 'border-white'} border-[1px] xl:border-2 w-12 xl:w-24`}
              onMouseEnter={() => setIsHovering(item.name)}
              onMouseLeave={() => setIsHovering('')}
            />
            {isHovering === item.name && (
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 -translate-y-2 bg-white p-2 z-50 whitespace-nowrap">
                <p>{item.name}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  )
}

export default Items