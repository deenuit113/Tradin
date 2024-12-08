import { defineRecipe, Flex } from "@chakra-ui/react";

export const containerRecipe = defineRecipe({
    base: {
        display: "flex",
        padding: "1rem 1rem 1rem 1rem",
        width: "100%",
        minHeight: "90vh",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex",
        bg: "backgroundColor",
        overflowY: "auto",
        transition: "width 0.3s ease, margin-left 0.3s ease",
        gap: {
            base: "20px",
            lg: "20px",
            sm: "20px",
        },
    },
    variants: {
        sidebarOpen: {
            true: {
                width: {
                    base: "85%",
                    lg: "85%",
                    sm: "100%",
                },
                marginLeft: {
                    base: "15%",
                    lg: "15%",
                    sm: "0",
                }
            },
            false: {
                width: "100%",
                marginLeft: "0",
            }
        }
    },
});

export const backTestContainerRecipe = defineRecipe({
    base: {
        width: "100%",
        bg: "backgroundColor",
        marginBottom: "1rem",
        display: "flex",
        gap: {
            base: "20px",
            lg: "20px",
            sm: "0px",
        },
        flexDirection: {
            base: "row",
            lg: "row",
            sm: "column",
        },
        
        alignItems: "stretch",
        overflow: "visible",
    }
})
