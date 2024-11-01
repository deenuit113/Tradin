export interface Theme {
    backgroundColor: string;
    innerbackgroundColor: string;
    moreinnerbackgroundColor: string;
    moreinnerborderColor: string;
    textColor: string;
    reversedTextColor: string;
    iconColor: string;
    timeTextColor: string;
    widgetBackgroundColor: string;
    toggleColor: string;
    scrollbarThumbColor: string;
    scrollbarThumbHoverColor: string;
    widgetAddBackgroundColor: string;
    widgetAddColor: string;
    widgetDropDownHoverColor: string;
    sidebarMenuHoverColor: string;
    darkModeSwitchBoxShadow: string;
    selectorBackgroundColor: string;
    // MainPage widget
    priceUpIconColor: string;
    priceDownIconColor: string;
    //notification
    notificationButtonBgColor: string;
    notificationButtonTextColor: string;
    notificationButtonBorderColor: string;
    notificationButtonHoverBgColor: string;
    notificationActiveButtonBgColor: string;
    notificationActiveButtonTextColor: string;
    notificationActiveButtonBorderColor: string;
    notificationActiveButtonHoverBgColor: string;
    notificationInnerContentBackgroundColor: string;
    notificationUnreadMessageTextColor: string;
    notificationReadMessageTextColor: string;
    notificationVolumeSliderBackgroundColor: string;
    notificationTrashIconColor: string;
    notificationTrashIconHoverColor: string;
    notificationToolTipBackgroundColor: string;
    //breadcrumb
    breadcrumbBackgroundColor: string;
    breadcrumbTextColor: string;
    breadcrumbLinkColor: string;
    breadcrumbLinkHoverColor: string;
    breadcrumbSeparatorColor: string;
    breadcrumbEditIconColor: string;
    breadcrumbEditInputBorderColor: string;
    skeletonBaseColor: string;
    skeletonHighlightColor: string;
    //datePicker
    highlightColor: string;
    hoverColor: string;
    borderColor: string;
    //backtest
    backTestButtonColor: string;
    backTestButtonHoverColor: string;
    backTestInputBackgroundColor: string;
    OptionHighlightColor: string;
    ProfitPositiveColor: string;
    ProfitNegativeColor: string;
    CarouselDotActiveColor: string;
    CarouselDotDefaultColor: string;
}

export const lightTheme = {
    backgroundColor: '#f0f0f0',
    innerbackgroundColor: '#e0e0e0',
    moreinnerbackgroundColor: '#d0d0d0',
    moreinnerborderColor: '#b0b0b0',
    textColor: '#333',
    reversedTextColor: '#f0f0f0',
    iconColor: '#333',
    timeTextColor: 'grey',
    widgetBackgroundColor: '#fff',
    toggleColor: '#0070f3',
    scrollbarThumbColor: '#888',
    scrollbarThumbHoverColor: '#555',
    widgetAddBackgroundColor: '#ffffff',
    widgetAddColor: '#0070f3',
    widgetDropDownHoverColor: '#d0d0d0',
    sidebarMenuHoverColor: '#d0d0d0',
    darkModeSwitchBoxShadow: '0px 0px 10px yellow',
    selectorBackgroundColor: 'rgba(240, 240, 240, 0.9)',
    // MainPage widget
    priceUpIconColor: '#ff0000',
    priceDownIconColor: '#0000ff',
    //notification
    notificationButtonBgColor: '#f0f0f0',
    notificationButtonTextColor: '#333',
    notificationButtonBorderColor: '#ddd',
    notificationButtonHoverBgColor: '#e0e0e0',
    notificationActiveButtonBgColor: '#007BFF',
    notificationActiveButtonTextColor: '#fff',
    notificationActiveButtonBorderColor: '#007BFF',
    notificationActiveButtonHoverBgColor: '#0056b3',
    notificationInnerContentBackgroundColor: '#DFDFDF',
    notificationUnreadMessageTextColor: '#000',
    notificationReadMessageTextColor: '#888',
    notificationVolumeSliderBackgroundColor: '#ddd',
    notificationTrashIconColor: '#888',
    notificationTrashIconHoverColor: '#333',
    notificationToolTipBackgroundColor: '#444',
    //breadcrumb
    breadcrumbBackgroundColor: '#B0C4DE',
    breadcrumbTextColor: '#333',
    breadcrumbLinkColor: '#0056b3',
    breadcrumbLinkHoverColor: '#003d82',
    breadcrumbSeparatorColor: '#6c757d',
    breadcrumbEditIconColor: '#6c757d',
    breadcrumbEditInputBorderColor: '#0056b3',
    //skeletonUI
    skeletonBaseColor: '#c0c0c0',
    skeletonHighlightColor: '#e0e0e0',
    //datePicker
    highlightColor: '#B0C4DE',
    hoverColor: '#d0d0d0',
    borderColor: '#ccc',
    //backtest
    backTestButtonColor: '#1DB717',
    backTestButtonHoverColor: '#d0d0d0',
    backTestInputBackgroundColor: '#f0f0f0',
    OptionHighlightColor: '#4682B4',
    ProfitPositiveColor: '#28a745',
    ProfitNegativeColor: '#dc3545',
    CarouselDotActiveColor: '#333',
    CarouselDotDefaultColor: '#ccc'
};

export const darkTheme = {
    backgroundColor: '#333',
    innerbackgroundColor: '#444',
    moreinnerbackgroundColor: '#555',
    moreinnerborderColor: '#888',
    textColor: '#f0f0f0',
    reversedTextColor: '#333',
    iconColor: '#f0f0f0',
    timeTextColor: 'lightgrey',
    widgetBackgroundColor: '#333',
    toggleColor: '#333',
    scrollbarThumbColor: '#f0f0f0',
    scrollbarThumbHoverColor: '#aaa',
    widgetAddBackgroundColor: '#a0a0a0',
    widgetAddColor: '#333',
    widgetDropDownHoverColor: '#555',
    sidebarMenuHoverColor: '#555',
    darkModeSwitchBoxShadow: '0px 0px 10px lightblue',
    selectorBackgroundColor: 'rgba(51, 51, 51, 0.9)',
    // MainPage widget
    priceUpIconColor: '#FF474C',
    priceDownIconColor: '#4AA8D8',
    // notification
    notificationButtonBgColor: '#555',
    notificationButtonTextColor: '#f0f0f0',
    notificationButtonBorderColor: '#777',
    notificationButtonHoverBgColor: '#666',
    notificationActiveButtonBgColor: '#0056b3',
    notificationActiveButtonTextColor: '#fff',
    notificationActiveButtonBorderColor: '#0056b3',
    notificationActiveButtonHoverBgColor: '#003d80',
    notificationInnerContentBackgroundColor: '#353535',
    notificationUnreadMessageTextColor: '#fff',
    notificationReadMessageTextColor: '#ccc',
    notificationVolumeSliderBackgroundColor: '#666',
    notificationTrashIconColor: '#888',
    notificationTrashIconHoverColor: '#555',
    notificationToolTipBackgroundColor: '#555',
    //breadcrumb
    breadcrumbBackgroundColor: '#4682B4',
    breadcrumbTextColor: '#F0F0F0',
    breadcrumbLinkColor: '#F5FEFF',
    breadcrumbLinkHoverColor: '#80BFFF',
    breadcrumbSeparatorColor: '#aaa',
    breadcrumbEditIconColor: '#aaa',
    breadcrumbEditInputBorderColor: '#4DA6FF',
    //skeletonUI
    skeletonBaseColor: '#666',
    skeletonHighlightColor: '#888',
    //datePicker
    highlightColor: '#4682B4',
    hoverColor: '#444',
    borderColor: '#666',
    //backtest
    backTestButtonColor: '#1DA717',
    backTestButtonHoverColor: '#555',
    backTestInputBackgroundColor: '#555',
    OptionHighlightColor: '#B0C4DE',
    ProfitPositiveColor: '#4caf50',
    ProfitNegativeColor: '#f44336',
    CarouselDotActiveColor: '#ccc',
    CarouselDotDefaultColor: '#333'
};