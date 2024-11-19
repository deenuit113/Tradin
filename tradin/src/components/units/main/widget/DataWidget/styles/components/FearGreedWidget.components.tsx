import { chakra } from "@chakra-ui/react";
import { 
    backgroundCircleRecipe, 
    foregroundCircleRecipe, 
    progressBarContainerRecipe, 
    progressTextRecipe, 
    svgContainerRecipe,
} from "../recipes/fearGreedWidget.recipes";

export const ProgressBarContainer = chakra("div", progressBarContainerRecipe);
export const SvgContainer = chakra("svg", svgContainerRecipe);
export const BackgroundCircle = chakra("circle", backgroundCircleRecipe);
export const ForegroundCircle = chakra("circle", foregroundCircleRecipe);
export const ProgressText = chakra("text", progressTextRecipe);


