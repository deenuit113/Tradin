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