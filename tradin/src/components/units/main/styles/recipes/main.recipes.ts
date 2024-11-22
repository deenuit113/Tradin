import { defineRecipe } from "@chakra-ui/react";

export const containerRecipe = defineRecipe({
    base: {
        display: "flex",
        width: "100%",
        height: "90vh",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        bg: "backgroundColor",
        overflowY: "auto",
    },
});

export const switchContainerRecipe = defineRecipe({
    base: {
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        transition: "width 0.3s ease, margin-left 0.3s ease",
        padding: "10px 10px 10px 10px",
        bg: "backgroundColor", //mainSwitchContainerColor
        gap: "15px",
    },
    variants: {
        sidebarOpen: {
            true: {
                width: "85%",
                marginLeft: "15%",
            },
            false: {
                width: "100%",
                marginLeft: "0",
            }
        }
    }
});

export const widgetGridRecipe = defineRecipe({
    base: {
        width: "100%",
        transition: "width 0.3s ease, margin-left 0.3s ease",
        padding: "1.5rem 1rem 1rem 1rem",
        minHeight: "100%",
        // overflowY: "auto",
        justifyContent: "center",
        alignItems: "center",
        bg: "transparent",
    },
});

export const widgetAddContainerRecipe = defineRecipe({
    base: {
        bg: "backgroundColor.secondary",
        boxShadow: "0 10px 16px rgba(0, 0, 0, 0.2)",
        borderRadius: "8px",
        padding: "1rem",
        margin: "auto",
        gap: "5px",
        width: {
            lg: "240px", // 240
            sm: "210px", // 200
        },
        height: {
            lg: "160px", // 200
            sm: "140px", // 150
        },
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.3s ease",
        _hover: {
            transform: "scale(1.05)",
        },
    },
})

export const widgetAddBtnRecipe = defineRecipe({
    base: {
        bg: "widgetAddBtnColor",
        color: "#f0f0f0",
        border: "none",
        borderRadius: "8px",
        width: "100%",
        height: "80%",
        padding: {
            lg: "1rem 1rem 0.5rem 1rem",
            sm: "0.5rem 0.5rem 0 0.5rem",
        },
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        cursor: "pointer",
        fontSize: 1,

        "& .PlusIcon": {
            fontSize: "3rem",
        },
    }

});
