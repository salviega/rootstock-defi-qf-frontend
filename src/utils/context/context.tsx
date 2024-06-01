import { createContext } from "react";

interface ContextProps  {
  activeLayout: string;
  setActiveLayout: (newActiveLayout: string) => void;
  isClicked: number;
  setIsClicked: (newIsClicked: number) => void;
  activePopUp: boolean;
  setActivePopUp: (newActivePopUp: boolean) => void;
}

const myContext = createContext<ContextProps>({
  activeLayout: 'home',
  setActiveLayout: () => {},
  isClicked: 0,
  setIsClicked: () => {},
  activePopUp: false,
  setActivePopUp: () => {},
})

export { myContext }