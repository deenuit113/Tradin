import { chakra, Grid, GridItem } from "@chakra-ui/react";
import { 
    containerRecipe, 
    switchContainerRecipe, 
    widgetAddBtnRecipe, 
    widgetAddContainerRecipe, 
    widgetGridRecipe 
} from "../recipes/main.recipes";

export const Container = chakra("div", containerRecipe);
export const SwitchContainer = chakra("div", switchContainerRecipe);
export const WidgetGrid = chakra(Grid, widgetGridRecipe);
export const WidgetAddContainer = chakra(GridItem, widgetAddContainerRecipe);
export const WidgetAddBtn = chakra("button", widgetAddBtnRecipe);