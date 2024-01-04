import { useState } from "react";
import { RunesData } from "../utility/types";


interface Props {
  runes: RunesData[];
}


function Runes({ runes }: Props) {
  const [isHovering, setIsHovering] = useState<string>('');


  return (
    <>
      <div className="flex flex-wrap xl:flex-nowrap gap-2 xl:gap-0 xl:space-x-5 items-center w-[80%] xl:w-[40rem] my-4 xl:my-7">
        {runes.map((rune) => (
          <div key={rune.name} className="relative">
            <img
              src={`https://ddragon.leagueoflegends.com/cdn/img/${rune.icon}`}
              alt={rune.name}
              key={rune.id}
              className="border-[1px] xl:border-2 border-white rounded-full [&:nth-child(1)]:border-0 [&:nth-child(1)]:w-8 [&:nth-child(1)]:h-8 xl:[&:nth-child(1)]:w-12 xl:[&:nth-child(1)]:h-12 w-8 h-8 xl:w-12 xl:h-12"
              onMouseEnter={() => setIsHovering(rune.name)}
              onMouseLeave={() => setIsHovering('')}
            />
            {isHovering === rune.name && (
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 -translate-y-2 bg-white p-2 z-50 whitespace-nowrap">
                <p>{rune.name}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  )
}

export default Runes