import { defineTokens } from "@chakra-ui/react";

const fallback = `-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`;

export const fonts = defineTokens.fonts({
    heading: {
        value: `Noto Sans KR, ${fallback}`,
    },
    body: {
        value: `Noto Sans KR, ${fallback}`, 
    },
    mono: {
        value: `SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace`,
    },
});