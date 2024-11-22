import { defineRecipe } from "@chakra-ui/react";

export const firstBoxRecipe = defineRecipe({
    base: {
        bg: "iconColor",
        borderRadius: "2px",
        transition: "all 0.3s ease-in-out",
        transformOrigin: "2px 4px",
        height: "4px",
    },
    variants: {
        isClose: {
            true: {
                width: "27.2px",
                transform: "rotate(45deg) translate(0px, 0px)"
            },
            false: {
                width: "24px"
            },
        },
    },
})

export const secondBoxRecipe = defineRecipe({
    base: {
        bg: "iconColor",
        borderRadius: "2px",
        transition: "all 0.3s ease-in-out",
        transformOrigin: "center",
        height: "4px",
    },
    variants: {
        isClose: {
            true: {
                width: "27.2px",
                transform: "scaleX(0)"
            },
            false: {
                width: "24px"
            },
        },
    },
})

export const thirdBoxRecipe = defineRecipe({
    base: {
        bg: "iconColor",
        borderRadius: "2px",
        transition: "all 0.3s ease-in-out",
        transformOrigin: "2px 0px",
        height: "4px",
    },
    variants: {
        isClose: {
            true: {
                width: "27.2px",
                transform: "rotate(-45deg) translate(0px, 0px)"
            },
            false: {
                width: "24px"
            },
        },
    },
})