import { useEffect } from "react";
import { preLoaderAnim } from "../animations/index.js";

export default function Preloader() {
  useEffect(() => {
    preLoaderAnim();
  }, []);

  return (
    <div className="preloader w-full h-screen flex justify-center items-center bg-amber-400 text-black font-semibold fixed top-0 bottom-0 right-0 z-50 overflow-hidden">
      <div className="texts-container flex justify-between items-center w-[33%] h-16 text-2xl overflow-hidden">
        <span>FOODOS</span>
        <span>|</span>
        <span>Delights</span>
        <span>Delivered</span>
      </div>
    </div>
  );
}
