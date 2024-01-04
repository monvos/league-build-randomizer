import { useState } from "react";
import { SummonersData } from "../utility/types";


interface Props {
  summoners: SummonersData[];
  version: string;
}


function Summoners({ summoners, version }: Props) {
  const [isHovering, setIsHovering] = useState<string>('');


  return (
    <>
      <div className="flex space-x-2 xl:space-x-3 mb-7">
        {summoners.map((summoner) => (
          <div key={summoner.name} className="relative">
            <img
              src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${summoner.image.full}`}
              alt={summoner.name}
              className="border-[1px] xl:border-2 border-white w-10 xl:w-16"
              onMouseEnter={() => setIsHovering(summoner.name)}
              onMouseLeave={() => setIsHovering('')}
            />
            {isHovering === summoner.name && (
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 -translate-y-2 bg-white p-2 z-50 whitespace-nowrap">
                <p>{summoner.name}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  )
}

export default Summoners