"use client";

import { chakra, Button } from "@chakra-ui/react";

import { 
    signUpFormRecipe,
    inputContainerRecipe,
    passwordToggleIconRecipe,
    errorMsgWrapperRecipe,
    signUpButtonRecipe,
    buttonWrapperRecipe,
    agreementErrorMsgWrapperRecipe,
} from "../recipes/signUpModal.recipe";

export const SignUpForm = chakra("form", signUpFormRecipe);
export const InputContainer = chakra("div", inputContainerRecipe);
export const ErrorMsgWrapper = chakra("div", errorMsgWrapperRecipe);
export const PasswordToggleIcon = chakra("div", passwordToggleIconRecipe);
export const SignUpButton = chakra(Button, signUpButtonRecipe);
export const ButtonWrapper = chakra("div", buttonWrapperRecipe);
export const AgreementErrorMsgWrapper = chakra("div", agreementErrorMsgWrapperRecipe);
