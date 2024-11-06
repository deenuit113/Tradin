import { SubmitHandler, UseFormReturn } from "react-hook-form";

export interface SignupForm {
    email: string;
    password: string;
    passwordConfirm: string;
    nickname: string;
}

type PickFormMethods = Pick<UseFormReturn<SignupForm>, 'register' | 'handleSubmit' | 'formState'>;

export interface SignUpModalUIProps {
    formMethods: PickFormMethods;
    onSubmit: SubmitHandler<SignupForm>;
    checkCharCode: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}