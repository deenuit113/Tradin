import { defineRecipe } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";

const slideUp = keyframes`
    0% {
        transform: translateY(100%);
        opacity: 0;
    }
    50% {
        transform: translateY(0%);
        opacity: 1;
    }
`

export const headerContainerRecipe = defineRecipe({
    base: {
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        height: "10vh",
        bg: "background",
        borderBottom: "1px solid borderColor",
        padding: "0",
        boxSizing: "border-box",
        gap: "1rem",
    },
});


export const leftContainerRecipe = defineRecipe({
    base: {
        width: "15%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
    },
});

export const sidebarBtnContainerRecipe = defineRecipe({
    base: {
        width: "30%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
    },
});

export const titleRecipe = defineRecipe({
    base: {
        width: "70%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "25px",
        fontWeight: "900",
        color: "textColor",
        cursor: "pointer",
        bg: "transparent",

        "& .logo": {
            fill: "iconColor",
            display: {
                lg: "block",
                md: "none",
                sm: "none",
            }
        },
        "& #t-bar": {
            transition: "width 0.2s ease-in-out",
            display: {
                lg: "block",
                md: "none",
            }
        },
        _hover: {
            "& #t-bar": {
                width: "77px",
            }
        },
        "& .Title-SVP": {
            fontSize: "20px",
            display: {
                lg: "none",
                md: "inline-block",
            }
        },
    },
});

export const centerContainerRecipe = defineRecipe({
    base: {
        flex: "1",
        textAlign: "center",
        width: {
            md: "40%",
        },
        marginLeft: {
            md: "20px",
        }
    }
})

export const marqueeRecipe = defineRecipe({
    base: {
        borderRadius: "10px",
        overflow: "hidden",
        whiteSpace: "nowrap",
        bg: "backgroundColor.primary",
        position: "relative",
        height: "50px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "10px 15px",

        "& p": {
            margin: "0",
            position: "absolute",
            animation: `${slideUp} 1s ease-in-out`,
            textOverflow: "ellipsis",
            overflow: "hidden",
            textDecoration: "none",
            whiteSpace: "nowrap",
            display: "inline-block",
            width: "90%",
            color: "textColor",
        },

        "& a": {
            fontSize: {
                md: "13px"
            }
        }
    },
});

export const darkModeButtonRecipe = defineRecipe({
    base: {
        bg: "transparent",

        _hover :{
            bg: "transparent",
        },
    },
})