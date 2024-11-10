import { SubmitHandler, UseFormReturn } from "react-hook-form";

export interface SignUpForm {
    email: string;
    password: string;
    passwordConfirm: string;
    nickname: string;
}

export interface SignUpModalProps {
    open: boolean;
    onClose: () => void;
}

type PickFormMethods = Pick<UseFormReturn<SignUpForm>, 'register' | 'handleSubmit' | 'formState'>;

export interface SignUpModalUIProps {
    open: boolean;
    onClose: () => void;
    formMethods: PickFormMethods;
    onSubmit: SubmitHandler<SignUpForm>;
    checkCharCode: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}