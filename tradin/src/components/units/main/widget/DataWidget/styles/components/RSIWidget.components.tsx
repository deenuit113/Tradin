import { chakra, Text } from "@chakra-ui/react";
import { 
    gaugeContainerRecipe, 
    gaugeSvgRecipe, 
    arcPathRecipe, 
    gaugeNeedleRecipe, 
    gaugeTextRecipe, 
    explanationContainerRecipe, 
    explanationRecipe
} from "../recipes/rsiWidget.recipes";

export const GaugeContainer = chakra("div", gaugeContainerRecipe);
export const GaugeSvg = chakra("svg", gaugeSvgRecipe);
export const ArcPath = chakra("path", arcPathRecipe);
export const GaugeNeedle = chakra("line", gaugeNeedleRecipe);
export const GaugeText = chakra(Text, gaugeTextRecipe);
export const Explanation = chakra("div", explanationRecipe);
export const ExplanationContainer = chakra("div", explanationContainerRecipe);