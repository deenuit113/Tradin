import { defineRecipe } from "@chakra-ui/react";

export const containerRecipe = defineRecipe({
    base: {
        display: "flex",
        width: "100%",
        height: "90vh",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        bg: "backgroundColor.primary",
    },
});

export const headerRecipe = defineRecipe({
    base: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 1rem",
        bg: "breadcrumbBackgroundColor",
        transition: "width 0.3s ease, marginLeft 0.3s ease",
        height: {
            base: "10%",
            lg: "10%",
            sm: "8%",
        },
    },
    variants: {
        sidebarOpen: {
            true: {
                width: "85%",
                marginLeft: "15%",
            },
            false: {
                width: "100%",
                marginLeft: "0",
            }
        }
    }
});

export const mainContentRecipe = defineRecipe({
    base: {
        maxWidth: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: "20px",
        overflowY: "auto",
        overflowX: "hidden",
        boxSizing: "border-box",
        height: "100%",
        transition: "width 0.3s ease, marginLeft 0.3s ease;",
        padding: {
            base: "2rem",
            lg: "2rem",
            sm: "0.5rem",
        },
    },
    variants: {
        sidebarOpen: {
            true: {
                width: "85%",
                marginLeft: "15%",
            },
            false: {
                width: "100%",
                marginLeft: "0",
            }
        }
    }
});

export const userInfoContainerRecipe = defineRecipe({
    base: {
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        width: {
            base: "15%",
            lg: "15%",
            sm: "40%",
        },
    }
});

export const userInfoTitleContainerRecipe = defineRecipe({
    base: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        fontWeight: "700",
        flexGrow: "1",
    }
});

export const userInfoTitleRecipe = defineRecipe({
    base: {
        width: "100%",
        height: "100%",
        padding: "5px 10px",
        color: "textColor",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        fontSize: "1rem",
    },
});

export const userInfoDataContainerRecipe = defineRecipe({
    base: {
        width: "70%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
});

export const userInfoDataRecipe = defineRecipe({
    base: {
        width: "100%",
        height: "100%",
        padding: "5px 10px",
        color: "textColor",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        fontSize: "0.8rem",
    }
});