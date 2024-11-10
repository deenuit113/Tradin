
import { defineStyle } from "@chakra-ui/react";

export const floatingStyles = defineStyle({
    pos: "absolute",
    bg: "backgroundColor",
    px: "3",
    top: "0",
    insetStart: "4",
    fontWeight: "bold",
    pointerEvents: "none",
    transition: "position",
    borderRadius: "5px",
    padding: "0 10px",
    _peerPlaceholderShown: {
        color: "fg.muted",
        top: "5",
        insetStart: "3",
    },
    _peerFocusVisible: {
        color: "fg",
        top: "-3",
        insetStart: "4",
        bg: "transparent",
    },
})