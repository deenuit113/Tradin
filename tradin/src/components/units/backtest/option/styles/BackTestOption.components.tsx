import { Box, chakra } from "@chakra-ui/react";
import { 
    buttonsContainerRecipe,
    optionsContainerRecipe,
    savedOptionsButtonRecipe,
    savedOptionsDropdownRecipe,
    savedOptionsWrapperRecipe,
    savedOptionItemRecipe,
    savedOptionContentRecipe,
    savedOptionNameRecipe,
    savedOptionDescriptionRecipe,
    savedOptionsButtonGroupRecipe,
    editButtonRecipe,
    editNameInputRecipe,
    removeButtonRecipe,
    backTestButtonRecipe,
    errorMsgRecipe,
    optionsGroupRecipe,
    optionWrapperRecipe,
    optionHeaderContainerRecipe,
    optionInfoContainerRecipe,
    optionTitleRecipe,
    datePickerWrapperRecipe,
    datePickerOptionContentRecipe,
    datePickerInputRecipe,
    dateRangeSeparatorRecipe,
    datePickerContainerRecipe
} from "./backTestOption.recipes";

export const OptionsContainer = chakra("div", optionsContainerRecipe);
export const ButtonsContainer = chakra("div", buttonsContainerRecipe);
export const SavedOptionsWrapper = chakra("div", savedOptionsWrapperRecipe);
export const SavedOptionsButton = chakra("div", savedOptionsButtonRecipe);
export const SavedOptionsDropdown = chakra("div", savedOptionsDropdownRecipe);
export const SavedOptionItem = chakra("div", savedOptionItemRecipe);
export const SavedOptionContent = chakra("div", savedOptionContentRecipe);
export const SavedOptionName = chakra("div", savedOptionNameRecipe);
export const SavedOptionDescription = chakra("div", savedOptionDescriptionRecipe);
export const SavedOptionsButtonGroup = chakra("div", savedOptionsButtonGroupRecipe);
export const EditButton = chakra("button", editButtonRecipe);
export const EditNameInput = chakra("input", editNameInputRecipe);
export const RemoveButton = chakra("button", removeButtonRecipe);
export const BackTestButton = chakra("button", backTestButtonRecipe);
export const ErrorMsg = chakra("p", errorMsgRecipe);
export const OptionsGroup = chakra("div", optionsGroupRecipe);
export const OptionWrapper = chakra("div", optionWrapperRecipe);
export const OptionHeaderContainer = chakra("div", optionHeaderContainerRecipe);
export const OptionInfoContainer = chakra("div", optionInfoContainerRecipe);
export const OptionTitle = chakra("label", optionTitleRecipe);
export const DatePickerWrapper = chakra("div", datePickerWrapperRecipe);
export const DatePickerOptionContent = chakra("div", datePickerOptionContentRecipe);
export const DatePickerInput = chakra("input", datePickerInputRecipe);
export const DateRangeSeparator = chakra("div", dateRangeSeparatorRecipe);
export const DatePickerContainer = chakra("div", datePickerContainerRecipe);