import { defineRecipe } from "@chakra-ui/react";

export const gaugeContainerRecipe = defineRecipe({
    base: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        position: "relative",
    },
});

export const gaugeSvgRecipe = defineRecipe({
    base: {
        width: "60%",
        height: "40%",
        overflow: "visible",
    },
});

export const arcPathRecipe = defineRecipe({
    base: {
        fill: "none",
        strokeWidth: "10px",
        transition: "stroke 0.3s ease-in-out",
    },
    variants: {
        color: {
            red: { stroke: "#BF1E2E" },
            green: { stroke: "#50C878" },
            orange: { stroke: "#FFA500" },
        },
    },
});

export const gaugeNeedleRecipe = defineRecipe({
    base: {
        strokeWidth: "6px",
        strokeLinecap: "round",
        transformOrigin: "50% 80%",
        stroke: "iconColor",
        transition:
            "transform 1s cubic-bezier(0.68, -1.00, 0.27, 1.55)",
    },
});

export const gaugeTextRecipe = defineRecipe({
    base: {
        fontSize: "16px",
        fontWeight: "700",
        fill: "#333",
        textAnchor: "middle",
        alignmentBaseline: "middle",
    },
});

export const explanationRecipe = defineRecipe({
    base:({
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "11px",
        fontWeight: "400",
        color: "textColor",
        textAnchor: "middle",
        alignmentBaseline: "middle",
        transition: "opacity 0.3s ease-in-out",
    }),
});

export const explanationContainerRecipe = defineRecipe({
    base: {
        transitionProperty: 'opacity',
        transitionDuration: '0.3s',
        transitionTimingFunction: 'ease-in-out',
    },
    
    variants: {
        hovered: {
            true: {
                opacity: 1,
                display: 'block',
            },
            false: {
                opacity: 0,
                display: 'none',
            },
        },
    },
  
    defaultVariants: {
        hovered: false,
    }
});