import { defineRecipe } from "@chakra-ui/react";

export const containerRecipe = defineRecipe({
    base: {
        display: "flex",
        width: "100%",
        height: "190vh",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        bg: "backgroundColor",
        overflowY: "auto",
        gap: "1rem",
        transition: "width 0.3s ease, margin-left 0.3s ease",
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
        justifyContent: "flex-end",
        alignItems: "center",
        
        padding: "10px 10px 10px 10px",
        bg: "backgroundColor", //mainSwitchContainerColor
        gap: "15px",
        height: "5vh"
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

export const widgetGridRecipe = defineRecipe({
    base: {
        width: "100%",
        transition: "width 0.3s ease, margin-left 0.3s ease",
        minHeight: "85vh",
        padding: "1rem",
        justifyContent: "center",
        alignItems: "center",
        bg: "transparent",
        boxSizing: "border-box",
        overflowY: "auto",
        gridTemplateColumns: { 
            base: "repeat(auto-fill, minmax(250px, 1fr))", 
            lg: "repeat(auto-fill, minmax(240px, 1fr))",
            sm: "repeat(auto-fill, minmax(160px, 1fr))",
        },
        gridTemplateRows: {
            base: "repeat(auto-fill, minmax(220px, 1fr))", 
            lg: "repeat(auto-fill, minmax(160px, 1fr))",
            sm: "repeat(auto-fill, minmax(120px, 1fr))",
        },
        gap: { base: "1rem", lg: "10px", sm: "0px" },
        rowGap: { base: "1rem", lg: "15px", sm: "5px" },
        // borderWidth: "1px",
        // borderStyle: "solid",
        // borderColor: "borderGrayColor",
    },
});

export const widgetAddContainerRecipe = defineRecipe({
    base: {
        position: "relative",
        bg: "backgroundColor.secondary",
        boxShadow: "0 10px 16px rgba(0, 0, 0, 0.2)",
        borderRadius: "8px",
        padding: "1rem",
        margin: "auto",
        gap: "5px",
        width: {
            lg: "195px", // 240
            sm: "150px", // 200
        },
        height: {
            lg: "130px", // 200
            sm: "100px", // 150
        },
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.3s ease",
        _hover: {
            transform: "scale(1.05)",
        },
        boxSizing: "border-box",
    },
})

export const widgetAddBtnRecipe = defineRecipe({
    base: {
        bg: "widgetAddBtnColor",
        color: "#f0f0f0",
        border: "none",
        borderRadius: "8px",
        width: "100%",
        height: "100%",
        padding: {
            lg: "1rem",
            sm: "0.5rem",
        },
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        cursor: "pointer",
        fontSize: 1,
        "& .PlusIcon": {
            fontSize: "2rem",
            margin: "auto",
        },
    }

});
