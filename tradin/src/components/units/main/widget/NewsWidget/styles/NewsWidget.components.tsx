import { 
    newsImageRecipe, 
    newsWidgetRecipe,
    newsTitleRecipe,
    newsAuthorRecipe,
} from "./newsWidget.recipes";
import { chakra, Image, Text } from "@chakra-ui/react";

export const NewsWidget = chakra("div", newsWidgetRecipe);
export const NewsImage = chakra(Image, newsImageRecipe);
export const NewsTitle = chakra(Text, newsTitleRecipe);
export const NewsAuthor = chakra(Text, newsAuthorRecipe);