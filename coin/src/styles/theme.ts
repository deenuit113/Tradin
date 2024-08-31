export interface Theme {
    backgroundColor: string;
    textColor: string;
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
}

export const lightTheme = {
    backgroundColor: '#f0f0f0',
    textColor: '#333',
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
};

export const darkTheme = {
    backgroundColor: '#333',
    textColor: '#f0f0f0',
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
};