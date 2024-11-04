export interface LoginForm {
    email: string;
    password: string;
}

export interface LoginPageUIProps {
    onClickMoveToMainPage: () => void;
}