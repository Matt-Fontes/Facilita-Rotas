import { createContext, useRef } from "react";

export const ScrollContext = createContext(null);

// Contexto para armazenar ref da listagem e usar no scroll de "Explorar"
export default function ScrollProvider({ children }) {
    const scrollRef = useRef(null);

    return (
        <ScrollContext.Provider value={{ scrollRef }}>
            {children}
        </ScrollContext.Provider>
    )
}