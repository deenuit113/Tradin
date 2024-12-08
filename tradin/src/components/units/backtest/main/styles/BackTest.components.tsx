import { chakra } from "@chakra-ui/react";
import { 
    backTestContainerRecipe,
    containerRecipe,

} from "./backTest.recipes";

export const Container = chakra("div", containerRecipe);
export const BackTestContainer = chakra("div", backTestContainerRecipe);