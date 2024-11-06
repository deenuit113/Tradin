import axios from 'axios';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { signUpSchema } from "../../../../../util/yupSchemas";
import { SignupForm } from "./SignUpModal.types";
import { useRouter } from "next/navigation";
import SignUpModalUI from "./SignUpModal.presenter";

const apiUrl = '';

export default function SignUpModal(): JSX.Element {
    const router = useRouter();

    const { register, handleSubmit, formState } = useForm<SignupForm>({
        mode: 'onChange',
        resolver: yupResolver(signUpSchema),
        reValidateMode: 'onChange',
        defaultValues: {
          email: "",
          password: "",
          nickname: "",
        },
        shouldFocusError: true,
        shouldUnregister: true,
    });

    // 숫자와 영문자만 허용
    const checkCharCode = (event: React.KeyboardEvent<HTMLInputElement>) => {
        const regExp = /[^0-9a-zA-Z!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g;
        const ele = event.currentTarget;
        if (regExp.test(ele.value)) {
            ele.value = ele.value.replace(regExp, '');
        }
    };

    const onSubmitSignUpForm: SubmitHandler<SignupForm> = (data: SignupForm) => {
        onSendSignUpForm(data);
    };

    const onSendSignUpForm = async (signupForm: any) => {
        signupForm.roles = "USER";
        const jsonSignupForm = JSON.stringify(signupForm);
        console.log(jsonSignupForm)
        try {
            const response = await axios.post(apiUrl, jsonSignupForm, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log('Response from server:', response.data);
            alert("회원 가입 성공.")
            router.push("../login")
        } catch (error){
            console.error('error submitting data:', error);
            alert("회원 가입 실패.")
        }
    };

    return (
        <SignUpModalUI
            formMethods={{ register, handleSubmit, formState }}
            onSubmit={onSubmitSignUpForm}
            checkCharCode={checkCharCode}
        />
    );
};