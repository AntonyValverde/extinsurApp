import React, {createContext, useState, ReactNode} from "react"

const initialValue = {
    isCollapsedSidebar: false, 
    toogleSidevarColapseHandler: () => {},
};

export const SidebarContext = createContext(initialValue);

interface Props{
    children: ReactNode | ReactNode[];
}

const SidebarProvider = ({children}: Props) => {
    const[isCollapsedSidebar, setIsCollapsedSidebar] = useState <boolean>(false)

    const toogleSidevarColapseHandler = () =>{
        setIsCollapsedSidebar((prev) => !prev)
    }
     
    return (
        <SidebarContext.Provider 
            value={{isCollapsedSidebar,toogleSidevarColapseHandler}}
        >{children}</SidebarContext.Provider>)
}

export default SidebarProvider;