import { Box, chakra, useRecipe } from "@chakra-ui/react";
import { 
    longRatioBarRecipe,
    longShortRatioContainerRecipe,
    ratioBarContainerRecipe,
    shortRatioBarRecipe,
    timeStampRecipe,
} from "../recipes/longShortRatioWidget.recipes";
import { LongRatioBarProps, ShortRatioBarProps } from "../../../Widget.types";

export const LongShortRatioContainer = chakra("div", longShortRatioContainerRecipe);
export const RatioBarContainer = chakra("div", ratioBarContainerRecipe);
export const TimeStamp = chakra("p", timeStampRecipe);

export const LongRatioBar: React.FC<LongRatioBarProps> = ({ long, children }) => {
    const recipe = useRecipe({ recipe: longRatioBarRecipe });
    const styles = recipe();
    return (
        <Box width={`${long}%`} css={{ ...styles, "--width": `${long}%` }}>
            {children}
        </Box>
    );
}

export const ShortRatioBar: React.FC<ShortRatioBarProps> = ({ short, children }) => {
    const recipe = useRecipe({ recipe: shortRatioBarRecipe });
    const styles = recipe();
    return (
        <Box width={`${short}%`} css={{ ...styles, "--width": `${short}%` }}>
            {children}
        </Box>
    );
}