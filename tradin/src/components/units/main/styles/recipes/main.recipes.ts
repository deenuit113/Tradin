import { defineRecipe } from "@chakra-ui/react";

export const containerRecipe = defineRecipe({
    base: {
        display: "flex",
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

export const switchContainerRecipe = defineRecipe({
    base: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 10px 10px 10px",
        bg: "backgroundColor", //mainSwitchContainerColor
        gap: "5px",
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
    }
});

export const cryptoWidgetContainerRecipe = defineRecipe({
    base: {
        width: "100%",
        height: {
            base: "200px",
            lg: "200px",
            sm: "160px",
        },
        transition: "width 0.3s ease, margin-left 0.3s ease",
        padding: "0 1rem 1rem 1rem",
        alignItems: "center",
        bg: "transparent",
        boxSizing: "border-box",
        overflowY: "auto",
        gap: { base: "20px", lg: "20px", sm: "10px" },
        borderBottomWidth: "1px",
        borderStyle: "solid",
        borderColor: "borderGrayColor",
        borderRadius: "5px",
        position: "relative",
        overscrollBehaviorX: "contain", // X축 체이닝 방지
        overscrollBehaviorY: "none"
    },
});

export const dataWidgetContainerRecipe = defineRecipe({
    base: {
        display: "flex",
        flexDirection: "row",
        width: "50%",
        height: {
            base: "40vh",
            lg: "40vh",
            sm: "50vh",
        },
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "borderGrayColor",
        borderRadius: "5px",
        padding: "0.5rem 1rem 0.5rem 1rem",
        boxSizing: "border-box",
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
