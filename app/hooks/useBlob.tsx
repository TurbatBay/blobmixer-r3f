import { useEffect, useMemo, useState } from "react";
import { BlobSetting, Titles } from "../utils/blobSettings";
import { useSpring } from "@react-spring/web";
import useWheel from "./useWheel";

const useBlob = () => {
  const { prevPage, nextPage, setNextPage, setPrevPage } = useWheel();
  const [current, setCurrent] = useState(4);
  const [change, setChange] = useState(true);

  const length = Titles.length;
  const setting = useMemo(
    () => BlobSetting[Titles[current]],
    [nextPage, prevPage, current]
  );
  const pageToFalse = () =>
    !change && (setNextPage(false), setPrevPage(false), setChange(true));

  const clickHandler = (num: number) => {
    if (current == 0) {
      setCurrent(length - 1);
      return;
    }
    if (current == length - 1) {
      setCurrent(0);
      return;
    }
    setCurrent(current + num);
  };

  // console.log(nextPage);

  useEffect(() => {
    if (nextPage) {
      clickHandler(-1);
      return;
    }
    if (prevPage) {
      clickHandler(1);
      return;
    }
    console.log("test");
  }, [nextPage, prevPage]);

  pageToFalse();

  return { setChange, ...setting };
};

export default useBlob;
