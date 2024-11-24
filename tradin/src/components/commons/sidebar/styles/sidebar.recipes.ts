import { defineRecipe } from "@chakra-ui/react";

export const sidebarContainerRecipe = defineRecipe({
    base: {
        width: {
            base: "15%",
            lg: "15%",
            sm: "25%",
        },
        height: "90vh",
        boxShadow: "0 10px 10px rgba(0, 0, 0, 0.3)",
        borderRadius: "0 5px 5px 0",
        bg: "backgroundColor",
        overflowY: "auto",
        zIndex: "1500",
        position: "fixed",
        top: "10vh",
        transition: "left 0.3s ease",
    },
    variants: {
        sidebarOpen: {
            true: {
                left: "0",
            },
            false: {
                left: {
                    base: "-15%",
                    lg: "-15%",
                    sm: "-25%",
                },
            }
        }
    }
});

export const menuRecipe = defineRecipe({
    base: {
        listStyleType: "none",
        padding: "0",
        margin: "0",
        height: "100%",
    },
});

export const menuItemRecipe = defineRecipe({
    base: {
        padding: "1rem",
        cursor: "pointer",
        width: "100%",
        borderRadius: "5px",
        transition: "transform 0.3s ease, opacity 0.3s ease, background-color 0.3 ease-in-out",
        fontSize: {
            base: "14px",
            lg: "14px",
            sm: "12px",
        },
        _hover: {
            bg: "red"
        }
    },
    variants: {
        menuOpen: {
            true: {
                opacity: 1,
                transform: "translateY(0)",
            },
            false: {
                opacity: 0,
                transform: "translateY(-20px)",
            },
        },
    }
})

export const menuTitleRecipe = defineRecipe({
    base: {
        width: "80%",
        height: "100%",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        color: "textColor",
        paddingLeft: "1rem",

        "& p": {
            fontSize: "14px",
        },

        "& .MenuIcon": {
            marginRight: "10px",
        }
    }
});

export const subMenuRecipe = defineRecipe({
    base: {
        listStyleType: "none",
        paddingLeft: "10%",
        margin: "0",
        overflow: "hidden",
        transition: "max-height 1s ease-in-out",

        "& li": {
            padding: "0.5rem",
            color: "textColor",
        },
        _hover: {
            "& li": {
                bg: "red",
            }
        },
    },
    variants: {
        subMenuOpen: {
            true: {
                maxHeight: "500px",
            },
            false: {
                maxHeight: "0",
            },
        },
    }
});

export const itemContainerRecipe = defineRecipe({
    base: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: "5px",
        cursor: "pointer",
        height: {
            base: "60px",
            lg: "60px",
            sm: "50px",
        },

        _hover: {
            bg: "red",
        }
    }
});
