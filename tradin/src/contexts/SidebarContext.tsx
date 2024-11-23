'use client';

import { createContext, useContext, useState, ReactNode, useRef } from "react";

interface SidebarContextProps {
    sidebarOpen: boolean;
    toggleSidebar: () => void;
    setSidebarOpen: (open: boolean) => void;
    sidebarRef: React.RefObject<HTMLDivElement>;
    sidebarButtonRef: React.RefObject<HTMLDivElement>;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(undefined);

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const sidebarRef = useRef<HTMLDivElement>(null);
    const sidebarButtonRef = useRef<HTMLDivElement>(null);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <SidebarContext.Provider 
            value={{ 
                sidebarOpen, 
                toggleSidebar, 
                setSidebarOpen,
                sidebarRef,
                sidebarButtonRef,
            }}>
            {children}
        </SidebarContext.Provider>
    );
};

export const useSidebar = () => {
    const context = useContext(SidebarContext);
    if (context === undefined) {
        throw new Error("useSidebar must be used within a SidebarProvider");
    }
    return context;
};