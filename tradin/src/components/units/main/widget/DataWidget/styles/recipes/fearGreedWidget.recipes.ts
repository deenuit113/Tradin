import { defineRecipe } from "@chakra-ui/react";

export const progressBarContainerRecipe = defineRecipe({
    base: {
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        position: "relative",
    },
});

export const svgContainerRecipe = defineRecipe({
    base: {
        transform: "rotate(-90deg)",
        position: "relative",
        zIndex: 1,
        backgroundColor: "transparent",
    },
});

export const backgroundCircleRecipe = defineRecipe({
    base: {
        stroke: "#a8a8a8",
        strokeWidth: "11px",
        fill: "none",
        zIndex: 998,
    },
});

export const foregroundCircleRecipe = defineRecipe({
    base: {
        fill: "none",
        transitionProperty: "stroke-dashoffset, stroke-width",
        transitionDuration: "0.4s",
        transitionTimingFunction: "ease-out",
        zIndex: 999,
        stroke: "#4169E1",
    },
    variants: {
        hovered: {
            true: {
                strokeWidth: "15px",
            },
            false: {
                strokeWidth: "10px",
            },
        },
    },
});

export const progressTextRecipe = defineRecipe({
    base: {
        fontSize: "1.2rem",
        fontWeight: 700,
        color: "textColor",
        opacity: 0,
        transitionProperty: "opacity",
        transitionDuration: "0.4s",
        transitionTimingFunction: "ease-out",
    },
    variants: {
        hovered: {
            true: {
                opacity: 1,
            },
            false: {
                opacity: 0,
            },
        },
    },
});