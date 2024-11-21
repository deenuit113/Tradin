'use client';

import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react"
import { keyframes } from "./keyframes";

const config = defineConfig({
    theme: {
        keyframes: keyframes,
        semanticTokens: {
            colors: {
                testButtonColor: {
                    value: { base: "red", _dark: "green" },
                },
                backgroundColor: {
                    DEFAULT: { value: {base: "#f0f0f0", _dark: "#333" } },
                    primary: { value: {base: "#e0e0e0", _dark: "#444" } },
                    secondary: { value: {base: "d0d0d0", _dark: "#555" } },
                },
                textColor: {
                    value: { base: "#333", _dark: "#f0f0f0" },
                },
                borderColor: {
                    value: { base: "#ccc", _dark: "#666" },
                },
                iconColor: {
                    value: { base: "#333", _dark: "#f0f0f0" },
                },
                loginInputBg : {
                    value: { base: "#ffffff", _dark: "#555" },
                },
                loginPlaceholderColor: {
                    value: { base: "#777", _dark: "#999" },
                },
                loginErrorMessageDanger: {
                    value: { base: "#ff0000", _dark: "#ff474c" },
                },
                mainSwitchContainerColor: {
                    value: { base: "#cbe5fd", _dark: "#335" },
                },
                widgetAddBtnColor: {
                    value: { base: "#0070f3", _dark: "#333" },
                },
                widgetSelectorBackgroundColor: {
                    value: { base: "rgba(240, 240, 240, 0.9)", _dark: 'rgba(51, 51, 51, 0.9)'},
                },
                breadcrumbBackgroundColor: {
                    value: { base: "#B0C4DE", _dark: "#4682B4" },
                }
            },
        },
        breakpoints:{
            full: "1200px",
            half: "799px"
        }
    },
})

export const system = createSystem(defaultConfig, config)

export default system;