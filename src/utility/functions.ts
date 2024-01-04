const getRandomValue = (i: number, N: number) => Math.floor(Math.random() * (N - i) + i);

export const getUniqueRandomNumbers = (MIN_VALUE: number, MAX_VALUE: number, UNIQUE_NUMBERS: number) => {
  const numbers = Array(MAX_VALUE - MIN_VALUE + 1)
    .fill(null)
    .map((_, index) => index + MIN_VALUE);
  const shuffle = [...numbers];
  shuffle.forEach(
    (_elem, i, arr, j = getRandomValue(i, arr.length)) =>
      ([arr[i], arr[j]] = [arr[j], arr[i]])
  );

  return shuffle.slice(0, UNIQUE_NUMBERS);
};

interface ItemsData {
  name: string;
  description: string;
  tags: string;
}

interface summonersData {
  modes: string[];
}

export const fetchData = async () => {
  // Fetches the latest version number.
  const fetchVersionData = await fetch('https://ddragon.leagueoflegends.com/api/versions.json');
  const versionData = await fetchVersionData.json();
  const version = versionData[0];

  const fetchChampionData = await fetch(`https://ddragon.leagueoflegends.com/cdn/${versionData[0]}/data/en_US/champion.json`)
  const championData = await fetchChampionData.json();
  const championDataArray = Object.values(championData.data)

  const fetchItemData = await fetch(`https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/item.json`);
  const itemData = await fetchItemData.json();
  const itemDataArray = Object.values<ItemsData>(itemData.data);

  const mythicItems = itemDataArray.filter(item =>
    item.description.indexOf('Mythic') !== -1
    && item.hasOwnProperty('requiredAlly') === false
    && item.hasOwnProperty('inStore') === false
  );

  const legendaryItems = itemDataArray.filter(item =>
    item.description.indexOf('Mythic') === -1
    && item.name.indexOf('The Golden Spatula') === -1
    && item.name.indexOf('Steel Sigil') === -1
    && item.hasOwnProperty('into') === false
    && item.hasOwnProperty('from')
    && item.tags.includes('Boots') === false
    && item.tags.includes('Lane') === false
    && item.hasOwnProperty('requiredAlly') === false
  );

  console.log(legendaryItems);

  const boots = itemDataArray.filter(item =>
    item.tags.includes('Boots') === true
    && item.hasOwnProperty('from')
  );

  const trinkets = itemDataArray.filter(item =>
    item.tags.includes('Trinket') === true
    && item.hasOwnProperty('inStore') === false
    && item.hasOwnProperty('requiredChampion') === false
  );



  const fetchSummonersData = await fetch(`https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/summoner.json`);
  const summonersData = await fetchSummonersData.json();
  const summonersDataArray = Object.values<summonersData>(summonersData.data);

  const summoners = summonersDataArray.filter(sum =>
    sum.modes.includes('CLASSIC') === true
  );



  const fetchRunesData = await fetch(`https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/runesReforged.json`);
  const runesData = await fetchRunesData.json();


  // console.log(itemDataArray)
  // console.log(runesData)

  const allData = {
    "version": version,
    "trinkets": trinkets,
    "boots": boots,
    "legendary": legendaryItems,
    "mythic": mythicItems,
    "summoners": summoners,
    "runes": runesData,
    "champions": championDataArray
  }

  // console.log(allData)

  return allData;

}


