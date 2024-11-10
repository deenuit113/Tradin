'use client';

import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react"

const config = defineConfig({
    strictTokens: true,
    theme: {
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
                }
            },
        },
    },
})

export const system = createSystem(defaultConfig, config)

export default system;

// import { createSystem, defineConfig } from "@chakra-ui/react"

// const config = defineConfig({
//   theme: {
//     semanticTokens: {
//       colors: {
//         bg: {
//           DEFAULT: { value: "{colors.gray.100}" },
//           primary: { value: "{colors.teal.100}" },
//           secondary: { value: "{colors.gray.100}" },
//         },
//       },
//     },
//   },
// })

// export default createSystem(config)