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
            templateColumns={{ base: "repeat(auto-fill, minmax(180px, 1fr))", md: "repeat(auto-fill, minmax(250px, 1fr))" }}
            gap={{ base: "0.5rem", md: "1rem" }}
            rowGap={{ base: "2rem", md: "3rem" }}
            css={styles}
            width={props.sidebarOpen ? "85%" : "100%"}
            marginLeft={props.sidebarOpen? "15%" : "0%"}
        >
            {props.children}
        </Grid>
    );
}