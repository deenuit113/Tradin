"use client";

import { chakra, IconButton, Box } from "@chakra-ui/react";
import { 
    widgetDropDownBtnRecipe, 
    widgetFooterRecipe, 
    widgetHeaderRecipe, 
    widgetRecipe, 
    widgetTimeStampRecipe, 
    widgetTitleRecipe 
} from "../recipes/dataWidget.recipes";

export const Widget = chakra("div", widgetRecipe);
export const WidgetDropDownBtn = chakra(IconButton, widgetDropDownBtnRecipe);
export const WidgetHeader = chakra("div", widgetHeaderRecipe);
export const WidgetTitle = chakra("div", widgetTitleRecipe);
export const WidgetFooter = chakra("div", widgetFooterRecipe);
export const WidgetTimeStamp = chakra("div", widgetTimeStampRecipe);