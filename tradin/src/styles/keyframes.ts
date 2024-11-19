import { defineKeyframes } from "@chakra-ui/react";

export const keyframes = defineKeyframes({
    fillLongBar: {
        from: {
            width: 0,
        },
        to: {
            width: "var(--width)",
        },
    },
    fillShortBar: {
        from: {
            width: 0,
        },
        to: {
            width: "var(--width)",
        },
    },
    colorChange: {
        "0%": { backgroundPosition: "0% 50%" },
        "50%": { backgroundPosition: "100% 50%"},
        "100%": { backgroundPosition: "0% 50%" },
    },
})