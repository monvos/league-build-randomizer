interface Props {
  id?: string;
}

function Background({ id }: Props) {
  return (
    <>
      <div
        className="w-full h-screen bg-center xl:bg-top bg-cover absolute top-0 left-0 -z-50 after:absolute after:top-0 after:bottom-0 after:w-full after:h-full after:bg-[rgba(0,0,0,.55)]"
        style={{ backgroundImage: `url("https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${id}_0.jpg")` }}
      />
    </>
  )
}

export default Background