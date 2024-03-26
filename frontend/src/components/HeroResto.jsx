const RestoCard = () => {
  return <h1>help</h1>;
};

const RestoCardView = () => {
  return (
    <div>
      <RestoCard />
      <RestoCard />
      <RestoCard />
      <RestoCard />
      <RestoCard />
    </div>
  );
};

export default function HeroResto() {
  return (
    <div className="bg-gray-200 rounded-md mt-12 p-8">
      <h1 className="text-xl font-semibold">
        Top restuarant chains in Manipal
      </h1>
      <RestoCardView />
    </div>
  );
}
