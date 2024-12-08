import { defineRecipe } from "@chakra-ui/react";

export const optionsContainerRecipe = defineRecipe({
    base: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "stretch",
        bg: "backgroundColor",
        overflow: "hidden",
        position: "relative",
        zIndex: "1",
        height: "auto",
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "borderGrayColor",
    },
    variants: {
        showToggleButton: {
            true: {
                borderRadius: "0px 0px 8px 8px",
                borderTopWidth: "0",
            },
            false: {
                borderRadius: "8px",
            }
        }
    }
});

export const buttonsContainerRecipe = defineRecipe({
    base: {
        display: "flex",
        justifyContent: "flex-end",
        padding: "20px",
        width: "100%",
        gap: "15px",
    }
});

// 저장된 옵션 버튼 & 백테스트 실행 버튼 관련

export const savedOptionsWrapperRecipe = defineRecipe({
    base: {
        position: "relative",
        display: "inline-block",
    }
});

export const savedOptionsButtonRecipe = defineRecipe({
    base: {
        border: "none",
        padding: {
            base: "10px 15px",
            lg: "10px 15px",
            sm: "5px 10px",
        },
        textAlign: "center",
        textDecoration: "none",
        display: "inline-block",
        cursor: "pointer",
        borderRadius: "6px",
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "borderGrayColor",
        fontSize: {
            base: "0.7rem",
            lg: "0.7rem",
            sm: "0.5rem",
        },
        fontWeight: {
            base: "700",
            lg: "700",
            sm: "550",
        },
        transition: "background-color 0.3s",
        _hover: {
            
        }
    },
    variants: {
        isActive: {
            true: {
                bg: "optionHighlightColor",
                color: "reversedTextColor",
                _hover: {
                    bg: "optionHighlightColorHover",
                }
            },
            false: {
                bg: "backgroundColor",
                color: "textColor",
                _hover: {
                    bg: "backgroundColor.primary",
                }
            }
        },
    }
});

export const savedOptionsDropdownRecipe = defineRecipe({
    base: {
        position: "absolute",
        top: "120%",
        right: "0%",
        bg: "backgroundColor",
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "#ddd",
        borderRadius: "6px",
        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
        zIndex: "1000",
        width: {
            base: "400px",
            lg: "400px",
            sm: "400px",
        },
        maxHeight: "155px",
        overflowY: "auto",
    }
});

export const savedOptionItemRecipe = defineRecipe({
    base: {
        padding: "10px",
        cursor: "pointer",
        transition: "background-color 0.3s",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        _hover: {
            bg: "dropdownHoverColor",
        },
        width: "100%",
        height: "75px",
        gap: "5px",
    }
});

export const savedOptionContentRecipe = defineRecipe({
    base: {
        flex: "1",
        cursor: "pointer",
        width: "80%",
        height: "100%",
    }
});

export const savedOptionNameRecipe = defineRecipe({
    base: {
        width: "100%",
        fontWeight: "700",
        fontSize: "1em",
        padding: "5px",
        color: "textColor",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
    }
});

export const savedOptionDescriptionRecipe = defineRecipe({
    base: {
        fontSize: "0.7em",
        fontWeight: "100",
        color: "descriptionTextColor",
    }
});

export const savedOptionsButtonGroupRecipe = defineRecipe({
    base: {
        display: "flex",
        alignItems: "center",
        height: "100%",
    }
});

export const editButtonRecipe = defineRecipe({
    base: {
        background: "none",
        border: "none",
        cursor: "pointer",
        marginRight: "5px",
        padding: "5px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "textColor",
        zIndex: "1500",
    }
});

export const editNameInputRecipe = defineRecipe({
    base: {
        width: "95%",
        fontWeight: "700",
        fontSize: "1em",
        bg: "transparent",
        padding: "5px 5px 0 5px",
        borderBottomWidth: "2px",
        borderStyle: "solid",
        borderColor: "textColor",
        color: "textColor",
        outline: "none",
        marginBottom: "5px",
        _focus: {
            borderBottomWidth: "2px",
            borderStyle: "solid",
            borderColor: "textColor",
        }
    }
});

export const removeButtonRecipe = defineRecipe({
    base: {
        background: "none",
        border: "none",
        color: "danger",
        cursor: "pointer",
        padding: "5px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    }
});

export const backTestButtonRecipe = defineRecipe({
    base: {
        cursor: "pointer",
        border: "none",
        borderRadius: "6px",
        padding: {
            base: "10px 15px",
            lg: "10px 15px",
            sm: "5px 10px",
        },
        float: "right",
        transition: "all 0.3 ease-in-out",
        fontWeight: {
            base: "700",
            lg: "700",
            sm: "550",
        },
        bg: "backTestButtonColor",
        overflow: "hidden",
        position: "relative",
        display: "flex",
        alignItems: "center",
        fontSize: {
            base: "0.7rem",
            lg: "0.7rem",
            sm: "0.5rem",
        },
        _hover: {
            bg: "backTestButtonHoverColor",
            "& .RocketIcon": {
                transform: "translate(30px, -30px)",
            }
        },
        "& .RocketIcon": {
            marginRight: "5px",
            transition: "transform 0.3s ease-in-out",
        },
    }
});

// 옵션 관련

export const errorMsgRecipe = defineRecipe({
    base: {
        color: "danger",
        fontSize: "0.6em",
        marginTop: "3px",
        marginBottom: "5px",
        height: "1em",
        lineHeight: "1em",
    }
});

export const optionsGroupRecipe = defineRecipe({
    base: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        padding: "1rem",
    }
});

export const optionWrapperRecipe = defineRecipe({
    base: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        padding: "1rem",
    }
});

export const optionHeaderContainerRecipe = defineRecipe({
    base: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        minHeight: "2.5em",
    }
});

export const optionInfoContainerRecipe = defineRecipe({
    base: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
    }
});

export const optionTitleRecipe = defineRecipe({
    base: {
        marginBottom: "2%",
        fontSize: "1.2em",
        fontWeight: "700",
        color: "textColor",
    }
});

export const datePickerWrapperRecipe = defineRecipe({
    base: {
        position: "relative",
        width: "100%",
        marginBottom: "0.1px",

        "& .react-datepicker-wrapper": {
            width: "100%",
        },

        "& .react-datepicker-popper": {
            width: "100%",
            position: "relative !important",
            top: "100% !important",
            left: "0 !important",
            transform: "none !important",
            height: "auto",
            display: {
                base: "block",
                lg: "block",
                sm: "block", // 추후
            },
        },

        "& .react-datepicker": {
            width: "100%",
            fontSize: "1em",
            bg: "backgroundColor !important",
            color: "textColor",
            borderWidth: "1px !important",
            borderTopWidth: "none !important",
            borderStyle: "solid !important",
            borderColor: "borderGrayColor !important",
            borderRadius: "0px 0px 4px 4px !important",
        },

        "& .react-datepicker__triangle": {
            display: "none",
        },

        "& .react-datepicker__month-container": {
            width: "100%",
            borderRadius: "0px 0px 4px 4px",
        },

        "& .react-datepicker__month": {
            margin: "0",
            padding: "0",
            display: "grid",
            color: "textColor !important",
            gridTemplateRows: "repeat(6, 1fr)",
            gap: "2px",
            height: "auto",
        },

        "& .react-datepicker__week": {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 2%",
        },

        "& .react-datepicker__header": {
            bg: "backgroundColor !important",
            borderBottomWidth: "1px",
            borderStyle: "solid",
            borderColor: "borderGrayColor !important",
        },

        "& .react-datepicker__current-month": {
            marginBottom: "10px",
            color: "textColor !important",
        },

        "& .react-datepicker__day-name": {
            color: "textColor !important",
            width: "12%",
            height: {
                base: "30px",
                lg: "30px",
                sm: "20px",
            },
            lineHeight: {
                base: "30px",
                lg: "30px",
                sm: "20px",
            },
            margin: "0",
            padding: "0 !important",
            textAlign: "center",
            fontSize: "0.8em",
        },

        "& .react-datepicker__day": {
            aspectRatio: "1 / 1 !important",
            color: "textColor !important",
            _hover: {
                bg: "dayHoverColor !important",
                borderRadius: "50% !important",
            },
            borderRadius: "50% !important",
            lineHeight: {
                base: "30px",
                lg: "30px",
                sm: "20px",
            },
            margin: "0 !important",
            padding: "auto !important",
            textAlign: "center !important",
            fontSize: "0.8em !important",
            display: "flex !important",
            alignItems: "center !important",
            justifyContent: "center !important",
        },

        "& .react-datepicker__day--selected": {
            bg: "optionHighlightColor !important",
            color: "backgroundColor !important",
        },

        "& .react-datepicker__day--outside-month": {
            visibility: "hidden",
        },

        "& .react-datepicker__day-names": {
            display: "flex",
            justifyContent: "space-between",
            padding: "0 2%",
        },
    }
});

export const datePickerOptionContentRecipe = defineRecipe({
    base: {
        display: "flex",
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 30px",
        
    }
});

export const datePickerInputRecipe = defineRecipe({
    base: {
        textAlign: "center",
        width: "100%",
        padding: "2%",
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "borderGrayColor",
        bg: "dateInputColor",
        color: "textColor",
        borderRadius: "4px 4px 0px 0px",
        fontSize: "1em",
        fontWeight: "700",
    },

});

export const dateRangeSeparatorRecipe = defineRecipe({
    base: {
        fontSize: "1.5em",
        color: "textColor",
        margin: "0",
        display: "flex",
        alignItems: "center",
    }
});

export const datePickerContainerRecipe = defineRecipe({
    base: {
        display: "flex",
        flexDirection: "column",
        width: "40%",
        borderRadius: "4px",
    },
    variants: {
        hasError: {
            true: {
                borderWidth: "1px",
                borderStyle: "solid",
                borderColor: "danger !important",
            },
            false: {
            }
        }
    }
});
