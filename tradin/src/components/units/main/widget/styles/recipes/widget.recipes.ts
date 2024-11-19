import { defineRecipe } from "@chakra-ui/react";

export const widgetRecipe = defineRecipe({
    base: {
        display: "flex",
        position: "relative",
        flexDirection: "column",
        bg: "backgroundColor.primary",
        padding: {
            lg: "1rem",
            md: "1rem",
        },
        transition: "transform 0.3s ease",
        width: {
            lg: "200px", // 240
            sm: "180px", // 200
        },
        height: {
            lg: "150px", // 200
            sm: "135px", // 150
        },
        margin: "auto",
        borderRadius: "8px",
        boxShadow: "0 10px 16px rgba(0, 0, 0, 0.2)",
        _hover: {
            transform: "scale(1.05)",
        },
    },
    variants: {
        isDragging: {
            true: {
                transform: "scale(1.05)",
            },
            false: {
                transform: "scale(1)",
            },
        },
    },
    defaultVariants: {
        isDragging: false,
    },
});

export const widgetDropDownContainerRecipe = defineRecipe({
    base: {
        position: 'absolute',
        top: '10px',
        right: '10px',
        zIndex: "1020",
    },
});

export const widgetDropDownBtnRecipe = defineRecipe({
    base: {
        bg: "transparent",
    },
});