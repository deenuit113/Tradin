import { chakra } from "@chakra-ui/react";
import { 
    containerRecipe, 
    headerRecipe, 
    mainContentRecipe, 
    userInfoContainerRecipe,
    userInfoDataContainerRecipe,
    userInfoDataRecipe,
    userInfoTitleContainerRecipe,
    userInfoTitleRecipe
} from "./profile.recipes";

export const Container = chakra("div", containerRecipe);
export const Header = chakra("div", headerRecipe);
export const MainContent = chakra("div", mainContentRecipe);
export const UserInfoContainer = chakra("div", userInfoContainerRecipe);
export const UserInfoTitleContainer = chakra("div", userInfoTitleContainerRecipe);
export const UserInfoTitle = chakra("label", userInfoTitleRecipe);
export const UserInfoDataContainer = chakra("div", userInfoDataContainerRecipe);
export const UserInfoData = chakra("label", userInfoDataRecipe);

