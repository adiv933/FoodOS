export default function Footer() {
  return (
    <div>
      <div className="w-screen h-[600px] bg-[url('../../public/assets/footer-animated-curves.svg')] bg-no-repeat bg-left-bottom "></div>
      <div className="bg-amber-400 w-full h-72">
        <div className="w-[75%] h-72 mx-auto flex justify-between ">
          <div className="flex-col p-2 w-1/2">
            <h1 className="text-6xl">FOODOS</h1>
            <h1 className="text-6xl">FOODOS</h1>
            <h1 className="text-6xl">FOODOS</h1>
          </div>
          <div className="flex justify-between w-1/2">
            <div className="w-1/2 p-4">
              <h1 className="text-2xl pb-4">get in touch</h1>
              <ul className="pl-2">
                <li>instagram</li>
                <li>mail</li>
                <li>whatsapp</li>
              </ul>
            </div>

            <div className="w-1/2 p-4">
              <h1 className="text-2xl pb-4">our partners</h1>
              <ul className="pl-2">
                <li>the indian kitchen</li>
                <li>pai tiffins</li>
                <li>dollops</li>
                <li>the mill</li>
                <li>dexters</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
