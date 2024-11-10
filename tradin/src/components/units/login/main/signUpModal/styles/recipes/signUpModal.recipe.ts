import { defineRecipe } from "@chakra-ui/react";

export const signUpFormRecipe = defineRecipe({
    base: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        padding: "1rem",
    },
});

export const inputContainerRecipe = defineRecipe({
    base: {
        position: "relative",
        width: "100%",
        padding: "10px 10px 0px 10px",
        boxSizing: "border-box",
        marginBottom: "0",
    },
});

export const errorMsgWrapperRecipe = defineRecipe({
    base: {
        padding: "0 1rem",
        width: "100%",
        fontSize: "11px",
        color: "red",
        textAlign: "left",
        wordWrap: "break-word",
        marginTop: "0",
    },
});

export const passwordToggleIconRecipe = defineRecipe({
    base: {
        position: "absolute",
        top: "22px",
        right: "20px",
        cursor: "pointer",
        width: "20px",
        height: "20px",
        color: "iconColor",
    },
});

export const signUpButtonRecipe = defineRecipe({
    base: {
        width: "300px",
        display: "flex",
        fontSize: "16px",
        fontWeight: "bolder",
        borderRadius: "5px",
        height: "40px",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#106FCB",
        color: "#F5F5F5",

        _hover: {
            backgroundColor: "#127CE2",
            cursor: "pointer"
        }
    }
});

export const buttonWrapperRecipe = defineRecipe({
    base: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        marginTop: "1rem",
    }
});

export const agreementErrorMsgWrapperRecipe = defineRecipe({
    base : {
        width: "100%",
        fontSize: "11px",
        color: "loginErrorMessageDanger",
        textAlign: "center",
        wordWrap: "break-word",
        padding: "0 1rem",
    }
});