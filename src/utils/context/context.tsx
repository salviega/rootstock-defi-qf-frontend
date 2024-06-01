import { createContext } from "react";

interface ContextProps  {
  activeLayout: string;
  setActiveLayout: (newActiveLayout: string) => void;
  isClicked: number;
  setIsClicked: (newIsClicked: number) => void;
}

const myContext = createContext<ContextProps>({
  activeLayout: 'home',
  setActiveLayout: () => {},
  isClicked: 0,
  setIsClicked: () => {}
})

export { myContext }