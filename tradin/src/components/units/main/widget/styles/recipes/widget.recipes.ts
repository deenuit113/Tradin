import { defineRecipe } from "@chakra-ui/react";

export const widgetRecipe = defineRecipe({
    base: {
        display: "flex",
        position: "relative",
        flexDirection: "column",
        bg: "backgroundColor.secondary",
        padding: {
            lg: "1rem 1rem 0.5rem 1rem",
            sm: "0.5rem 0.5rem 0 0.5rem",
        },
        transition: "transform 0.3s ease",
        width: {
            lg: "195px", // 240
            sm: "150px", // 200
        },
        height: {
            lg: "130px", // 200
            sm: "100px", // 150
        },
        margin: "auto",
        borderRadius: "8px",
        boxShadow: "0 10px 16px rgba(0, 0, 0, 0.2)",
        _hover: {
            transform: "scale(1.05)",
        },
        boxSizing: "border-box",
        opacity: "0.9",
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
        color : {
            cryptoWidgetColor: {
                bg: "cryptoWidgetColor",
            },
            dataWidgetColor: {
                bg: "dataWidgetColor",
            },
        },
    },
    defaultVariants: {
        isDragging: false,
    },
});

export const widgetHeaderRecipe = defineRecipe({
    base: {
        marginTop: {
            base: "0",
            lg: "0",
            sm: "0px",
        },
        height: "20%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        zIndex: "1020",
    }
});

export const widgetTitleRecipe = defineRecipe({
    base: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        fontSize: {
            base: "14px",
            lg: "14px",
            sm: "11px"
        },
        fontWeight: "700",
        flexGrow: "1",
        color: "textColor",
    }
});

export const widgetDropDownBtnRecipe = defineRecipe({
    base: {
        bg: "transparent",
        _hover: {
            opacity: "0.5",
            zIndex: "1",
        }
    },
});

export const widgetFooterRecipe = defineRecipe({
    base: {
        height: "15%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    }
});

export const widgetTimeStampRecipe = defineRecipe({
    base: {
        color: "gray",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: {
            base: "10px",
            lg: "11px",
            md: "10px",
        },
    },
});