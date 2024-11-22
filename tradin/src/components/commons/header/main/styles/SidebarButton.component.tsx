import { chakra } from "@chakra-ui/react";
import { 
    firstBoxRecipe,
    secondBoxRecipe,
    thirdBoxRecipe
} from "../sidebarButton.recipes";

export const FirstBox = chakra("div", firstBoxRecipe);
export const SecondBox = chakra("div", secondBoxRecipe);
export const ThirdBox = chakra("div", thirdBoxRecipe);