import { defineRecipe } from "@chakra-ui/react";

export const mainContainerRecipe = defineRecipe({
    base: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        overflowY: "hidden",
        flexDirection: "column",
    },
});

export const containerRecipe = defineRecipe({
    base: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
        overflowY: "hidden",
        backgroundColor: "backgroundColor",
    },
});

export const loginTitleRecipe = defineRecipe({
    base: {
        fontSize: "40px",
        fontWeight: "700",
        cursor: "pointer",
        color: "iconColor",
        marginBottom: "2rem",
    },
});

export const loginFormRecipe = defineRecipe({
    base: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "350px",
        marginBottom: "1rem",
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

export const buttonWrapperRecipe = defineRecipe({
    base: {
        width: "100%",
        display: "flex",
        marginTop: "1rem",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
});

export const errorMsgWrapperRecipe = defineRecipe({
    base: {
        padding: "0 1rem",
        width: "100%",
        fontSize: "11px",
        color: "loginErrorMessageDanger",
        textAlign: "left",
        wordWrap: "break-word",
        marginTop: "0",
    },
});

export const loginInfoContainerRecipe = defineRecipe({
    base: {
        gap: "15px",
        width: "90%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        marginTop: "1rem",
    },
});

export const loginButtonRecipe = defineRecipe({
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

export const socialLoginContainerRecipe = defineRecipe({
    base: {
        display: "flex",
        flexDirection: "row",
        gap: "10px",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: "1rem",
    },
});

export const signUpContainerRecipe = defineRecipe({
    base: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
});

export const signUpButtonRecipe = defineRecipe({
    base: {
        backgroundColor: 'transparent',
        color: '#106FCB',
        border: 'none',
        padding: '10px 20px',
        textAlign: 'center',
        textDecoration: 'none',
        display: 'inline-block',
        fontSize: '16px',
        fontWeight: '700',
        cursor: 'pointer',
        borderRadius: '4px',

        _hover: {
            backgroundColor: "transparent",
            cursor: "pointer"
        }
    },
});