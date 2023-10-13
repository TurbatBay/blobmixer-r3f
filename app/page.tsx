"use client";
import { useEffect, useState } from "react";
import SphereCanvas from "./canvas/sphereCanvas";
import Test from "../components/test";
import Vr from "../components/vr";
import useUsefulHooks from "./hooks/useWheel";
import { pages } from "./canvas/Text/data";

const Home = () => {
  const [current, setCurrent] = useState(7);
  const { prevPage, nextPage, lastAction }: any = useUsefulHooks();

  useEffect(() => {
    if (lastAction) {
      if (lastAction === "next") {
        if (current === pages.length - 1) {
          setCurrent(0);
        } else {
          setCurrent(current + 1);
        }
        console.log("next");
      }
      if (lastAction === "prev") {
        if (current === 0) {
          setCurrent(pages.length - 1);
        } else {
          setCurrent(current - 1);
        }
        console.log("prev");
      }
    }
  }, [prevPage, nextPage]);
  return (
    <main className="w-full h-screen relative ">
      <SphereCanvas current={current} setCurrent={setCurrent} />
      <div className="flex justify-between z-10 absolute w-full top-0 left-0 p-10">
        <h3>Blobmixer</h3>
        <div className="flex items-center gap-2 text-transparent hover:text-white">
          <h3 className="text-white headerBtn">Try in VR</h3>
          <Vr />
        </div>
        <h3 className="headerBtn">About</h3>
      </div>

      <Test current={current} />
    </main>
  );
};

export default Home;
