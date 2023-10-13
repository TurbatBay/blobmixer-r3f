import { use, useContext } from "react";
import UsefulContext from "../contexts/usefulContext";

const useUsefulHooks = () => {
  const useFulContext = useContext(UsefulContext);
  return useFulContext;
};
export default useUsefulHooks;
