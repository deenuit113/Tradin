import { defineRecipe } from "@chakra-ui/react";

export const cryptoChartContainerRecipe = defineRecipe({
    base: {
        position: "fixed",
        bottom: "0",
        right: "0",
        bg: "backgroundColor",
        border: "1px solid borderColor",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
        borderRadius: "5px",
        color: "textColor",
        zIndex: "1300",
        width: {
            base: "40vw",
            lg: "40vw",
            sm: "70vw",
        },
        height: {
            base: "50vh",
            lg: "50vh",
            sm: "60vh",
        }
    }
});

