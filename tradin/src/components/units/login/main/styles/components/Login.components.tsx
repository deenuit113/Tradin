"use client";

import { chakra, Flex, Button, Box } from "@chakra-ui/react";
import { 
    mainContainerRecipe, 
    containerRecipe, 
    loginTitleRecipe,
    loginFormRecipe,
    inputContainerRecipe,
    buttonWrapperRecipe,
    errorMsgWrapperRecipe,
    loginInfoContainerRecipe,
    loginButtonRecipe,
    passwordToggleIconRecipe,
    socialLoginContainerRecipe,
    signUpContainerRecipe,
    signUpButtonRecipe,
} from "../recipes/login.recipe";

export const MainContainer = chakra(Flex, mainContainerRecipe);
export const Container = chakra("div", containerRecipe);
export const LoginTitle = chakra("h1", loginTitleRecipe);
export const LoginForm = chakra("form", loginFormRecipe);
export const InputContainer = chakra("div", inputContainerRecipe);
export const ButtonWrapper = chakra("div", buttonWrapperRecipe);
export const ErrorMsgWrapper = chakra("div", errorMsgWrapperRecipe);
export const LoginInfoContainer = chakra("div", loginInfoContainerRecipe);
export const LoginButton = chakra(Button, loginButtonRecipe);
export const PasswordToggleIcon = chakra("div", passwordToggleIconRecipe);
export const SocialLoginContainer = chakra("div", socialLoginContainerRecipe);
export const SignUpContainer = chakra("div", signUpContainerRecipe);
export const SignUpButton = chakra(Button, signUpButtonRecipe);