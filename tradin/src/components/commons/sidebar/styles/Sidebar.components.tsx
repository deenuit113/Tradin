import { chakra } from "@chakra-ui/react";
import { 
    itemContainerRecipe,
    menuRecipe,
    menuTitleRecipe,
    sidebarContainerRecipe,
} from "./sidebar.recipes";

export const SidebarContainer = chakra("div", sidebarContainerRecipe);
export const Menu = chakra("ul", menuRecipe);
export const MenuTitle = chakra("div", menuTitleRecipe);
export const ItemContainer = chakra("div", itemContainerRecipe);