"use client";

import { chakra, IconButton } from "@chakra-ui/react";
import { widgetDropDownBtnRecipe, widgetDropDownContainerRecipe, widgetRecipe } from "../recipes/widget.recipes";

export const Widget = chakra("div", widgetRecipe);
export const WidgetDropDownBtn = chakra(IconButton, widgetDropDownBtnRecipe);
export const WidgetDropDownContainer = chakra("div", widgetDropDownContainerRecipe);