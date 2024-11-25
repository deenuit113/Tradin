import { chakra, Grid, GridItem, useRecipe, Flex } from "@chakra-ui/react";
import { 
    containerRecipe, 
    switchContainerRecipe, 
    widgetAddBtnRecipe, 
    widgetAddContainerRecipe,
    cryptoWidgetContainerRecipe, 
} from "../recipes/main.recipes";

export const Container = chakra("div", containerRecipe);
export const SwitchContainer = chakra("div", switchContainerRecipe);
export const CryptoWidgetContainer = chakra(Flex, cryptoWidgetContainerRecipe);
export const WidgetAddContainer = chakra("div", widgetAddContainerRecipe);
export const WidgetAddBtn = chakra("button", widgetAddBtnRecipe);