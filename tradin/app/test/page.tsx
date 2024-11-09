"use client"

import { useColorMode } from "@/components/ui/color-mode"
import { Button } from "@chakra-ui/react"
import { FaMoon, FaSun } from "react-icons/fa"

export default function Test() {
    const { toggleColorMode, colorMode } = useColorMode()

    return (
            <Button
                aria-label="toggle color mode"
                onClick={toggleColorMode}
                color="testButtonColor"
                >
                {colorMode === "light" ? <FaMoon /> : <FaSun/>}
            </Button>
    )
}