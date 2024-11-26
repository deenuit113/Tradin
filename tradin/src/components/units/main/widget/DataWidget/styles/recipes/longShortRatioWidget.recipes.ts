import { defineRecipe } from "@chakra-ui/react"

export const longShortRatioContainerRecipe = defineRecipe({
    base: {
        width: "100%",
        height: "70%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        position: "relative",
        gap: "5px",
    },
});

export const ratioBarContainerRecipe = defineRecipe({
    base: {
        width: "95%",
        height: "30%",
        display: "flex",
        borderRadius: "5px",
        overflow: "hidden",
        position: "relative",
        padding: "0px 7px 0px 7px",
    },
});

export const longRatioBarRecipe = defineRecipe({
    base: {
        background: "linear-gradient(-45deg, #ff4b4b, #ff6f6f, #ff4b4b)",
        backgroundSize: "200% 200%",
        animation: "colorChange 3s ease infinite, fillLongBar 0.6s ease forwards",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        color: "white",
        fontSize: {
            base: "0.8rem",
            lg: "0.8rem",
            sm: "11px",
        },
        fontWeight: "600",
        paddingLeft: {
            base: "15px",
            lg: "15px",
            sm: "5px",
        },
        left: "0",
        borderRadius: "10px 0px 0px 10px",
    },
});

export const shortRatioBarRecipe = defineRecipe({
    base: {
        background: "linear-gradient(-45deg, #4b4bff, #6f6fff, #4b4bff)",
        backgroundSize: "200% 200%",
        animation: "colorChange 3s ease infinite, fillShortBar 0.6s ease forwards",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        color: "white",
        fontSize: {
            base: "0.8rem",
            lg: "0.8rem",
            sm: "11px",
        },
        fontWeight: "600",
        paddingRight: {
            base: "15px",
            lg: "15px",
            sm: "5px",
        },
        marginLeft: "auto",
        borderRadius: "0px 10px 10px 0px",
    },
});

export const timeStampRecipe = defineRecipe({
    base: {
        color: "gray",
        fontSize: {
            base: "10px",
            lg: "11px",
            md: "10px",
        },
        marginTop: {
            base: "5px",
            lg: "10px",
            md: "5px",
        }
    },
});