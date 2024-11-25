import { defineGlobalStyles } from "@chakra-ui/react";

const empty = "var(--chakra-empty,/*!*/ /*!*/)"

export const globalCss = defineGlobalStyles({
    "*": {
        fontFeatureSettings: '"cv11"',
        "--ring-inset": empty,
        "--ring-offset-width": "0px",
        "--ring-offset-color": "#fff",
        "--ring-color": "rgba(66, 153, 225, 0.6)",
        "--ring-offset-shadow": "0 0 #0000",
        "--ring-shadow": "0 0 #0000",
        ...Object.fromEntries(
            [
                "brightness",
                "contrast",
                "grayscale",
                "hue-rotate",
                "invert",
                "saturate",
                "sepia",
                "drop-shadow",
            ].map((prop) => [`--${prop}`, empty]),
        ),
        ...Object.fromEntries(
            [
                "blur",
                "brightness",
                "contrast",
                "grayscale",
                "hue-rotate",
                "invert",
                "opacity",
                "saturate",
                "sepia",
            ].map((prop) => [`--backdrop-${prop}`, empty]),
        ),
        "--global-font-mono": "fonts.mono",
        "--global-font-body": "fonts.body",
        "--global-color-border": "colors.border",
    },
    html: {
        color: "fg",
        bg: "backgroundColor",
        lineHeight: "1.5",
        colorPalette: "gray",
    },
    body: {
        bg: "backgroundColor",
        overflowY: "auto",
    },
    "*::placeholder": {
        color: "fg.muted/80",
    },
    "*::selection": {
        bg: "colorPalette.muted/80",
    },
    "::-webkit-scrollbar": {
        width: "12px",
    },
    "::-webkit-scrollbar-track": {
        bg: "transparent",
    },
    "::-webkit-scrollbar-thumb": {
        backgroundColor: "rgba(0, 0, 0, 0.5)", 
        borderRadius: "10px",
        border: "3px solid transparent",
    }
})