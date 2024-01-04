import { useEffect, useState } from "react"
import { fetchData, getUniqueRandomNumbers } from "./utility/functions";
import { ChampionData, RunesData, ItemsData, SummonersData, AllData } from "./utility/types";
import Champion from "./components/Champion";
import Background from "./components/Background";
import Runes from "./components/Runes";
import Summoners from "./components/Summoners";
import Items from "./components/Items";

// console.log(allItems)



function App() {
  const [allData, setAllData] = useState<AllData>({});
  const [version, setVersion] = useState<string>('');
  const [champ, setChamp] = useState<ChampionData>();
  const [runes, setRunes] = useState<RunesData[]>([]);
  const [items, setItems] = useState<ItemsData[]>([]);
  const [summoners, setSummoners] = useState<SummonersData[]>([]);


  const generate = () => {
    generateChampion(allData);
    generateRunes(allData);
    generateItems(allData);
    generateSummoners(allData);

  }


  const generateChampion = (allData: AllData) => {
    setChamp(allData.champions[Number(getUniqueRandomNumbers(0, allData.champions.length - 1, 1))])
    // console.log(Object.values(allData.champions[Number(getUniqueRandomNumbers(0, allData.champions.length - 1, 1))]))
    // console.log(allData.champions[0].info)
  }

  const generateRunes = (allData: AllData) => {
    const runeTrees = getUniqueRandomNumbers(0, allData.runes.length - 1, 2);
    const mainTree = allData.runes[runeTrees[0]].slots;
    const mainRune = mainTree[0].runes[Math.floor(Math.random() * mainTree[0].runes.length)];
    const lesserRuneOne = mainTree[1].runes[Math.floor(Math.random() * mainTree[1].runes.length)];
    const lesserRuneTwo = mainTree[2].runes[Math.floor(Math.random() * mainTree[2].runes.length)];
    const lesserRuneThree = mainTree[3].runes[Math.floor(Math.random() * mainTree[3].runes.length)];

    const secondTree = allData.runes[runeTrees[1]].slots;
    const secondRuneSet = getUniqueRandomNumbers(1, 3, 2).sort((a, b) => a - b);
    const secondLesserRuneOne =
      secondTree[secondRuneSet[0]].runes[
      Math.floor(Math.random() * secondTree[secondRuneSet[0]].runes.length)
      ];
    const secondLesserRuneTwo =
      secondTree[secondRuneSet[1]].runes[
      Math.floor(Math.random() * secondTree[secondRuneSet[1]].runes.length)
      ];


    const fullRunes = [
      mainRune,
      lesserRuneOne,
      lesserRuneTwo,
      lesserRuneThree,
      secondLesserRuneOne,
      secondLesserRuneTwo
    ]
    setRunes(fullRunes);
  }

  const generateItems = (allData: AllData) => {
    const trinket = allData.trinkets[Math.floor(Math.random() * allData.trinkets.length)];
    const boots = allData.boots[Math.floor(Math.random() * allData.boots.length)];
    const mythic = allData.mythic[Math.floor(Math.random() * allData.mythic.length)];

    const uniqueItems = getUniqueRandomNumbers(0, allData.legendary.length - 1, 4);
    const legendary = [...uniqueItems.map((n) => allData.legendary[n])];

    const fullItems = [
      boots,
      mythic,
      ...legendary,
      trinket
    ];

    // console.log(fullItems)

    setItems(fullItems);
  }

  const generateSummoners = (allData: AllData) => {
    setSummoners(getUniqueRandomNumbers(0, allData.summoners.length - 1, 2).map((x) => allData.summoners[x]));
  }

  useEffect(() => {
    const fetchAllData = async () => {
      const result = await fetchData();
      setAllData(result);
      setVersion(result.version);
      generateData(result);

    };

    const generateData = (data: AllData) => {
      generateChampion(data);
      generateRunes(data);
      generateItems(data);
      generateSummoners(data);
    };

    fetchAllData();


  }, []);


  if (champ === undefined) {
    return <div className="text-white">Loading.</div>
  }

  return (
    <>
      <div className="pt-3 xl:pt-12 pl-5 pr-5 xl:pl-36 xl:pr-36 w-fit">
        <Background id={champ.id} />
        <Champion name={champ.name} title={champ.title} blurb={champ.blurb} />
        <Runes runes={runes} />
        <Items items={items} version={version} />
        <Summoners summoners={summoners} version={version} />
        <button className="bg-neutral-900 bg-opacity-50 hover:bg-neutral-300 border-2 border-neutral-300 py-3 px-28 text-xl text-white hover:text-black uppercase font-medium font-main tracking-wide" onClick={generate}>Generate</button>
        <p className="font-main text-white opacity-75 text-sm mt-4">Made by: <a href="https://lndq.se/" target="_blank" className="underline hover:text-pink-500">lndq.se</a></p>
        <p className="font-main text-white opacity-30 text-xs mt-4">{version}</p>

      </div>
    </>
  )
}

export default App
