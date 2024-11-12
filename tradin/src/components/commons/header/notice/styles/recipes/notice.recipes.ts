import { defineRecipe } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";

const shakeAnimation = keyframes`
    0%, 100% {
        transform: rotate(0deg);
    }
    25% {
        transform: rotate(-15deg);
    }
    50% {
        transform: rotate(15deg);
    }
    75% {
        transform: rotate(-10deg);
    }
`;

export const bellIconButtonRecipe = defineRecipe({
    base: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        bg: "transparent",
        padding: "0",
        cursor: "pointer",
        transition: "transform 0.3s ease",
        _hover: {
            bg: "transparent",
            "& svg": {
                animation: `${shakeAnimation} 0.5s ease-in-out`,
                transformOrigin: "top center",
            },
        },
    },
});
