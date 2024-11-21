import { defineRecipe } from "@chakra-ui/react";

export const selectorOptionContainerRecipe = defineRecipe({
    base: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        overflowX: "auto",
        whiteSpace: "nowrap",
        height: {
            base: "250px",
            lg: "250px",
            sm: "220px",
        },
        padding: "10px 0",
        border: "1px solid lightgrey",
        borderRadius: "5px",
    }
});

export const selectorOptionRecipe = defineRecipe({
    base: {
        display: "inline-block",
        margin: "10px",
        cursor: "pointer",
        width: {
            base: "220px",
            lg: "220px",
            sm: "180px",
        }
    }
});

export const noWidgetMessageRecipe = defineRecipe({
    base: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        fontSize: "18px",
        color: "#888",
    }
});
