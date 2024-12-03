import { defineRecipe } from "@chakra-ui/react";

export const newsWidgetRecipe = defineRecipe({
    base: {
        bg: "dataWidgetColor",
        display: "flex",
        position: "relative",
        flexDirection: "column",
        padding: {
            lg: "1rem 1rem 0.5rem 1rem",
            sm: "0.5rem 0.5rem 0.3rem 0.5rem",
        },
        transition: "transform 0.3s ease",
        width: {
            lg: "360px", // 240
            sm: "270px", // 200
        },
        height: {
            lg: "250px", // 200
            sm: "200px", // 150
        },
        margin: "auto",
        borderRadius: "8px",
        boxShadow: "0 10px 16px rgba(0, 0, 0, 0.2)",
        _hover: {
            transform: "scale(1.02)",
        },
        boxSizing: "border-box",
        opacity: "0.9",
        flexShrink: 0,
        cursor: "pointer",
        overflow: "hidden",
    },
});

export const newsImageRecipe = defineRecipe({
    base: {
        width: "100%",
        height: "70%",
        objectFit: "cover",
        borderRadius: "8px",
        marginBottom: "0.5rem",
    }
})

export const newsTitleRecipe = defineRecipe({
    base: {
        fontSize: {
            base: "16px",
            lg: "16px",
            sm: "14px",
        },
        fontWeight: 700,
    }
})

export const newsAuthorRecipe = defineRecipe({
    base: {
        fontSize: {
            base: "14px",
            lg: "14px",
            sm: "12px",
        },
        fontWeight: 500,
        color: "lightgrey",
    }
})