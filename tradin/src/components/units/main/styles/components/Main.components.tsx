import { chakra, Grid, useRecipe } from "@chakra-ui/react";
import { 
    containerRecipe, 
    switchContainerRecipe, 
    widgetAddBtnRecipe, 
    widgetAddContainerRecipe, 
    widgetGridRecipe 
} from "../recipes/main.recipes";
import React from "react";

interface WidgetGridProps {
    children: React.ReactNode;
    sidebarOpen: boolean;
}

export const Container = chakra("div", containerRecipe);
export const SwitchContainer = chakra("div", switchContainerRecipe);
export const WidgetAddContainer = chakra("div", widgetAddContainerRecipe);
export const WidgetAddBtn = chakra("button", widgetAddBtnRecipe);
export function WidgetGrid(props: WidgetGridProps): JSX.Element {
    const recipe = useRecipe({ recipe: widgetGridRecipe });
    const styles = recipe();
    return (
        <Grid
            templateColumns= {{ 
                    base: "repeat(auto-fill, minmax(220px, 1fr))", 
                    lg: "repeat(auto-fill, minmax(270px, 1fr))",
                    sm: "repeat(auto-fill, minmax(220px, 1fr))",
            }}
            gap={{ base: "2rem", lg: "30px", sm: "10px" }}
            rowGap={{ base: "2rem", lg: "40px", sm: "40px" }}
            css={styles}
            width={props.sidebarOpen ? {base: "85%", lg: "85%", sm: "100%"} : "100%"}
            marginLeft={props.sidebarOpen? {base: "15%", lg: "15%", sm: "0%"} : "0%"}
        >
            {props.children}
        </Grid>
    );
}