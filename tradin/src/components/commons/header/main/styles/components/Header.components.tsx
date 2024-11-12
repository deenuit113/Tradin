"use client";

import { chakra, Flex, Button, Box, IconButton } from "@chakra-ui/react";
import { 
    headerContainerRecipe,
    titleRecipe,
    sidebarBtnContainerRecipe,
    leftContainerRecipe,
    centerContainerRecipe,
    marqueeRecipe,
} from "../recipes/header.recipes";

export const HeaderContainer = chakra("header", headerContainerRecipe);
export const Title = chakra("h1", titleRecipe);
export const SidebarBtnContainer = chakra("div", sidebarBtnContainerRecipe);
export const LeftContainer = chakra("div", leftContainerRecipe);
export const CenterContainer = chakra("div", centerContainerRecipe);
export const Marquee = chakra("div", marqueeRecipe);