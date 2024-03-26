/* eslint-disable react/no-unescaped-entities */
import Biryani_2 from "../../public/assets/heroCarousal/Biryani_2.png";
import Cakes from "../../public/assets/heroCarousal/Cakes.png";
import North_Indian_4 from "../../public/assets/heroCarousal/North_Indian_4.png";
import South_Indian_4 from "../../public/assets/heroCarousal/South_Indian_4.png";
import Omelette from "../../public/assets/heroCarousal/Omelette.png";
import Pizza from "../../public/assets/heroCarousal/Pizza.png";
import Pasta from "../../public/assets/heroCarousal/Pasta.png";
import Chinese from "../../public/assets/heroCarousal/Chinese.png";
import Paratha from "../../public/assets/heroCarousal/Paratha.png";
import "../index.css";

const images = [
  { url: Biryani_2, alt: "Biryani" },
  { url: Cakes, alt: "Cakes" },
  { url: Pasta, alt: "Pasta" },
  { url: Chinese, alt: "Chinese" },
  { url: Paratha, alt: "Paratha" },
  { url: North_Indian_4, alt: "North Indian" },
  { url: South_Indian_4, alt: "South Indian" },
  { url: Omelette, alt: "Omelette" },
  { url: Pizza, alt: "Pizza" },
];

const HeroImageAutoplay = () => {
  return (
    <div className="mt-8 p-8 bg-gray-200 rounded-md">
      <h1 className="text-xl font-semibold">What's on your mind?</h1>
      <div className="logos py-4 overflow-hidden relative">
        <div className="logos-slide flex">
          {images.map((image, index) => (
            <img
              src={image.url}
              key={index}
              className="w-40 h-52 mx-4 rounded-md hover:-translate-y-2 duration-200"
            />
          ))}
          {images.map((image, index) => (
            <img
              src={image.url}
              key={index}
              className="w-40 h-52 mx-4 rounded-md hover:-translate-y-2 duration-200"
            />
          ))}
        </div>
        <div className="absolute inset-y-0 left-0 top-4 h w-40 h-52 bg-gradient-to-r from-gray-200 to-transparent"></div>
        <div className="absolute inset-y-0 right-0 top-4 w-40 h-52 bg-gradient-to-l from-gray-200 to-transparent"></div>
      </div>
    </div>
  );
};

export default HeroImageAutoplay;
