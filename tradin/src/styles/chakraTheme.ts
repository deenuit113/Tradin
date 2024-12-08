'use client';

import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react"
import { keyframes } from "./keyframes";
import { globalCss } from "./global-css";
import { fonts } from "./fonts";

const config = defineConfig({
    globalCss: globalCss,
    theme: {
        tokens: {
            fonts: fonts,
        },
        keyframes: keyframes,
        semanticTokens: {
            colors: {
                sidebarHoverColor: {
                    value: { base: "#d0d0d0", _dark: "#555" },
                },
                backgroundColor: {
                    DEFAULT: { value: { base: "#f0f0f0", _dark: "#333" } },
                    primary: { value: { base: "#e0e0e0", _dark: "#444" } },
                    secondary: { value: { base: "#d0d0d0", _dark: "#555" } },
                },
                textColor: {
                    value: { base: "#333", _dark: "#f0f0f0" },
                },
                reversedTextColor: {
                    value: { base: "#f0f0f0", _dark: "#333" },
                },
                descriptionTextColor: {
                    value: { base: "grey", _dark: "lightgrey" },
                },
                borderGrayColor: {
                    value: { base: "#d0d0d0", _dark: "#666" },
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
                danger: {
                    value: { base: "#ff0000", _dark: "#ff474c" },
                },
                loginErrorMessageDanger: {
                    value: { base: "#ff0000", _dark: "#ff474c" },
                },
                mainSwitchContainerColor: {
                    value: { base: "#cbe5fd", _dark: "#335" },
                },
                widgetAddBtnColor: {
                    value: { base: "rgba(0, 112, 243, 0.8)", _dark: "#333" },
                },
                widgetSelectorBackgroundColor: {
                    value: { base: "rgba(240, 240, 240, 0.9)", _dark: 'rgba(51, 51, 51, 0.9)'},
                },
                breadcrumbBackgroundColor: {
                    value: { base: "#B0C4DE", _dark: "#4682B4" },
                },
                cryptoWidgetColor :{
                    value: { base: "rgba(173, 216, 230, 0.2)", _dark: "rgba(173, 216, 230, 0.1)" },
                },
                dataWidgetColor :{
                    value: { base: "rgba(255, 255, 194, 0.2)", _dark: "rgba(255, 255, 194, 0.1)" },
                },
                defaultWidgetColor: {
                    value: { base: "#e0e0e0", _dark: "#444" },
                },
                optionHighlightColor: {
                    value: { base: "#4682B4", _dark: "#B0C4DE" },
                },
                dropdownHoverColor: {
                    value: { base: "#d0d0d0", _dark: "#555" },
                },
                backTestButtonColor: {
                    value: { base: "#1DB717", _dark: "#1DA717" },
                },
                backTestButtonHoverColor: {
                    value: { base: "#d0d0d0", _dark: "#555" },
                },
                dayHoverColor: {
                    value: { base: "#d0d0d0", _dark: "#444" },
                },
                dateInputColor: {
                    value: { base: "#f0f0f0", _dark: "#555" },
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