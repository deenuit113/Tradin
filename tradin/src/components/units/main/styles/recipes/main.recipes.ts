import { defineRecipe, Flex } from "@chakra-ui/react";

export const containerRecipe = defineRecipe({
    base: {
        display: "flex",
        padding: "1rem 1rem 1rem 1rem",
        width: "100%",
        minHeight: "85vh",
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

export const rowBoxRecipe = defineRecipe({
    base: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        gap: {
            base: "40px",
            lg: "40px",
            sm: "20px",
        },
        width: "100%",
        alignItems: "stretch",
    }
});

export const widgetContainerRecipe = defineRecipe({
    base: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "space-between",
        gap: "10px",
    }
})

export const widgetContainerHeaderRecipe = defineRecipe({
    base: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: {
            base: "0px 20px",
            lg: "0px 20px",
            sm: "0px 10px",
        },
        gap: "5px",
    },
});

export const cryptoWidgetBoxRecipe = defineRecipe({
    base: {
        width: "100%",
        height: {
            base: "200px",
            lg: "200px",
            sm: "160px",
        },
        padding: "0 1rem 1rem 1rem",
        alignItems: "center",
        bg: "transparent",
        boxSizing: "border-box",
        overflowY: "auto",
        overflowX: "scroll",
        gap: { base: "20px", lg: "20px", sm: "10px" },
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "borderGrayColor",
        borderRadius: "5px",
        position: "relative",
        overscrollBehaviorX: "contain", // X축 체이닝 방지
        overscrollBehaviorY: "none"
    },
});

export const dataWidgetBoxRecipe = defineRecipe({
    base: {
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: "1rem",
        width: "100%",
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "borderGrayColor",
        borderRadius: "5px",
        padding: "1rem",
        boxSizing: "border-box",
    },
});

export const newsBoxRecipe = defineRecipe({
    base: {
        width: "100%",
        height: {
            base: "200px",
            lg: "200px",
            sm: "160px",
        },
        padding: "0 1rem 1rem 1rem",
        alignItems: "center",
        bg: "transparent",
        boxSizing: "border-box",
        overflowY: "auto",
        overflowX: "scroll",
        gap: { base: "20px", lg: "20px", sm: "10px" },
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "borderGrayColor",
        borderRadius: "5px",
        position: "relative",
        overscrollBehaviorX: "contain", // X축 체이닝 방지
        overscrollBehaviorY: "none",
        flexGrow: "1",
    },
});

export const widgetAddContainerRecipe = defineRecipe({
    base: {
        bg: "transparent",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "10px",
    },
})

export const widgetAddBtnRecipe = defineRecipe({
    base: {
        bg: "widgetAddBtnColor",
        color: "#f0f0f0",
        border: "none",
        borderRadius: "8px",
        width: {
            lg: "25px", // 240
            sm: "20px", // 200
        },
        height: {
            lg: "25px", // 200
            sm: "20px", // 150
        },
        padding: {
            lg: "auto",
            sm: "auto",
        },
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        cursor: "pointer",
        fontSize: 1,
        "& .PlusIcon": {
            fontSize: "12px",
            margin: "auto",
        },
        transition: "transform 0.3s ease-in-out",

        _hover: {
            transform: "scale(1.05)",
        }
    }

});
