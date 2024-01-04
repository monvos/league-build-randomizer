interface Props {
  name: string;
  title: string;
  blurb: string;
}

function Champion({ name, title, blurb }: Props) {
  return (
    <>
      <div className="">
        <h1 className="text-white text-[2rem] xl:text-[10rem] font-bold font-main xl:-mb-4">{name}</h1>
        <h2 className="text-white text-xl xl:text-4xl font-medium font-main">{title}</h2>
        <div className="text-white w-[80%] xl:w-[40rem]">
          <p className="text-xs xl:text-xl text-gray-200">{blurb}</p>
        </div>
      </div>
    </>
  )
}

export default Champion