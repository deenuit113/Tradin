import React from "react";
import { 
    noWidgetMessageRecipe, 
    selectorOptionContainerRecipe, 
    selectorOptionRecipe,
} from "../recipes/widgetSelector.recipes";
import { Box, chakra, useRecipe } from "@chakra-ui/react";

interface SelectorOptionContainerProps {
    children: React.ReactNode;
}

export const SelectorOption = chakra("div", selectorOptionRecipe);
export const NoWidgetMessage = chakra("div", noWidgetMessageRecipe);

export const SelectorOptionContainer: React.FC<SelectorOptionContainerProps> = ({ children }) => {
    const recipe = useRecipe({ recipe: selectorOptionContainerRecipe });
    const styles = recipe();
    return (
        <Box
            css={{ 
                ...styles,
                "&::-webkit-scrollbar": {
                    height: "12px",
                },
                "&::-webkit-scrollbar-thumb": {
                    borderRadius: "6px",
                },
                "&::-webkit-scrollbar-thumb:hover": {
                    backgroundColor: "#555",
                },
                "&::-webkit-scrollbar-track": {
                    background: "transparent",
                    borderRadius: "8px",
                }
            }}
        >
            {children}
        </Box>
    )
}