import { chakra, Grid, Flex } from "@chakra-ui/react";
import { 
    containerRecipe, 
    widgetContainerHeaderRecipe, 
    widgetAddBtnRecipe, 
    widgetAddContainerRecipe,
    cryptoWidgetBoxRecipe,
    dataWidgetBoxRecipe,
    widgetContainerRecipe,
    rowBoxRecipe,
    newsBoxRecipe,
} from "../recipes/main.recipes";

export const Container = chakra("div", containerRecipe);
export const RowBox = chakra("div", rowBoxRecipe);
export const WidgetContainer = chakra("div", widgetContainerRecipe);
export const WidgetContainerHeader = chakra("div", widgetContainerHeaderRecipe);
export const CryptoWidgetBox = chakra(Flex, cryptoWidgetBoxRecipe);
export const DataWidgetBox = chakra(Grid, dataWidgetBoxRecipe);
export const NewsBox = chakra(Flex, newsBoxRecipe);
export const WidgetAddContainer = chakra("div", widgetAddContainerRecipe);
export const WidgetAddBtn = chakra("button", widgetAddBtnRecipe);