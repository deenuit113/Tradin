"use client";

import { chakra, GridItem, IconButton } from "@chakra-ui/react";
import { 
    widgetDropDownBtnRecipe, 
    widgetFooterRecipe, 
    widgetHeaderRecipe, 
    widgetRecipe, 
    widgetTimeStampRecipe, 
    widgetTitleRecipe 
} from "../recipes/widget.recipes";

export const Widget = chakra(GridItem, widgetRecipe);
export const WidgetDropDownBtn = chakra(IconButton, widgetDropDownBtnRecipe);
export const WidgetHeader = chakra("div", widgetHeaderRecipe);
export const WidgetTitle = chakra("div", widgetTitleRecipe);
export const WidgetFooter = chakra("div", widgetFooterRecipe);
export const WidgetTimeStamp = chakra("div", widgetTimeStampRecipe);