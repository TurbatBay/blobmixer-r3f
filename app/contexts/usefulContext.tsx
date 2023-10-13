// Import the necessary modules and components.
import next from "next";
import { useState, useEffect, createContext } from "react";

// Create a context to share data among components.
const UsefulContext = createContext({} as any);

// Define a provider component for the context.
export const UsefulProvider = (props: any) => {
  // Define state variables to keep track of page navigation and user actions.
  let [prevPage, setPrevPage] = useState(0);
  let [nextPage, setNextPage] = useState(0);
  const [lastAction, setLastAction]: any = useState(null);
  const [hasDetectedDirection, setHasDetectedDirection] = useState(false);
  const [deltaX, setDeltaX] = useState(0);
  const [wheelOrArrow, setWheelOrArrow] = useState("wheel");
  let isWheelEventTriggered = false;

  // Handle the wheel event (mouse scroll).
  const handleWheel = (e: any) => {
    setWheelOrArrow("wheel");
    const deltaY = e.deltaY;
    const deltaX = e.deltaX;
    setDeltaX(deltaX);

    // Check if a wheel event has already been triggered to prevent multiple actions.
    if (!isWheelEventTriggered) {
      if (deltaX < 0) {
        if (deltaX < -2) {
          setPrevPage(++prevPage);
          setLastAction("prev");
        }
      } else if (deltaX > 0) {
        if (deltaX > 2) {
          setNextPage(++nextPage);
          setLastAction("next");
        }
      }
      isWheelEventTriggered = true;

      // Set a timeout to reset the flag after a delay if needed.
      setTimeout(() => {
        isWheelEventTriggered = false;
      }, 1000); // Adjust the delay as needed
    }
  };

  // Handle the arrow key event (keyboard navigation).
  const handleKeyDown = (e: any) => {
    setWheelOrArrow("arrow");
    if (e.key === "ArrowLeft") {
      setPrevPage(++prevPage);
      setLastAction("prev");
    } else if (e.key === "ArrowRight") {
      setNextPage(++nextPage);
      setLastAction("next");
    }
  };

  // Function to reset the direction detection flag.
  const updateToFalse = () => {
    setHasDetectedDirection(false);
  };

  // Add event listeners for wheel and arrow key events and remove them on cleanup.
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("wheel", handleWheel);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("wheel", handleWheel);
    };
  }, [hasDetectedDirection]);

  // Provide the context with relevant values and wrap child components.
  return (
    <UsefulContext.Provider
      value={{
        prevPage,
        updateToFalse,
        nextPage,
        lastAction,
        deltaX,
        wheelOrArrow,
      }}
    >
      {props.children}
    </UsefulContext.Provider>
  );
};

// Define a consumer component for the context.
export const UsefulConsumer = UsefulContext.Consumer;

// Export the context itself for use in other parts of the application.
export default UsefulContext;
