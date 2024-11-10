import * as S from "./Login.styles";
import NaverLogin from "../naver/NaverLogin";
import GoogleLogin from "../google/GoogleLogin";
import KakaoLogin from "../kakao/KakaoLogin";
import { LoginPageUIProps } from "./Login.types";
import { LoginForm } from "./Login.types";
import useLogin from "../../../../hooks/useLogin";
import { loginSchema } from "../../../../util/yupSchemas";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useTogglePasswordVisibility } from "../../../../hooks/useTogglePasswordVisibility";
import SignUpModal from "./signUpModal/SignUpModal.container";
import * as C from "./styles/components/Login.components";
import { Input, Field, HStack, Separator, Stack, Text, Box } from "@chakra-ui/react";
import { FaEyeSlash, FaEye, FaSignInAlt } from "react-icons/fa";
import { Checkbox } from "@/components/ui/checkbox"

export default function LoginPageUI(props: LoginPageUIProps): JSX.Element {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const onClickSignUpButton = () => {
        setIsModalOpen(prev => !prev);
    };

    const { onSendLoginForm } = useLogin();
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        setValue,
    } = useForm<LoginForm>({
        resolver: yupResolver(loginSchema),  // yup 스키마로 유효성 검사
        defaultValues: {
            email: "",
            password: "",
        }
    });
    const [saveIdChecked, setSaveIdChecked] = useState(false);
    const { isPasswordVisible, togglePasswordVisibility } = useTogglePasswordVisibility();
    
    useEffect(() => {
        const savedEmail = localStorage.getItem("savedEmail");
        if (savedEmail) {
            setValue("email", savedEmail); // 이메일 필드에 저장된 값을 설정
            setSaveIdChecked(true); // 체크박스를 선택 상태로 설정
        }
    }, [setValue]);

    // 숫자와 영문자만 허용
    const checkCharCode = (event: React.KeyboardEvent<HTMLInputElement>) => {
        const regExp = /[^0-9a-zA-Z!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g;
        const ele = event.currentTarget;
        if (regExp.test(ele.value)) {
            ele.value = ele.value.replace(regExp, '');
        }
    };

    // 로그인 폼 제출 처리
    const onSubmit = (data: LoginForm) => {
        if (saveIdChecked) {
            localStorage.setItem("savedEmail", data.email);
        } else {
            localStorage.removeItem("savedEmail");
        }
        onSendLoginForm(data);
    };

    return (
        <>
            <C.Container>
                <C.MainContainer>
                    <C.LoginTitle onClick={props.onClickMoveToMainPage}>Tradin</C.LoginTitle>
                    <C.LoginForm onSubmit={handleSubmit(onSubmit)}>
                        <Field.Root gap="0" marginBottom="1rem">
                            <C.InputContainer pos="relative" w="full">
                                <Input
                                    type="text"
                                    id="email"
                                    placeholder=""
                                    {...register("email")}
                                    defaultValue=""
                                    className="peer"
                                    marginBottom="5px"
                                    padding="10px 15px"
                                    borderColor="borderColor"
                                />
                                <Field.Label htmlFor="email" css={S.floatingStyles}>Email</Field.Label>
                            </C.InputContainer>
                            {errors.email && (
                                <C.ErrorMsgWrapper>{errors.email.message}</C.ErrorMsgWrapper>
                            )}
                        </Field.Root>

                        <Field.Root gap="0">
                            <C.InputContainer pos="relative" w="full">
                                <Input
                                    type={isPasswordVisible ? "text" : "password"}
                                    id="password"
                                    placeholder=""
                                    {...register("password")}
                                    defaultValue=""
                                    onKeyUp={checkCharCode}
                                    className="peer"
                                    marginBottom="5px"
                                    padding="10px 15px"
                                    borderColor="borderColor"
                                />
                                <Field.Label htmlFor="password" css={S.floatingStyles}>Password</Field.Label>
                                <C.PasswordToggleIcon onClick={togglePasswordVisibility}>
                                    {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                                </C.PasswordToggleIcon>
                            </C.InputContainer>
                            {errors.password && (
                                <C.ErrorMsgWrapper>{errors.password.message}</C.ErrorMsgWrapper>
                            )}
                        </Field.Root>
                        <C.LoginInfoContainer>
                                <Checkbox
                                    checked={saveIdChecked}
                                    onCheckedChange={(e) => setSaveIdChecked(!!e.checked)}
                                    size="sm"
                                >
                                    아이디 저장
                                </Checkbox>
                                <Checkbox size="sm">자동 로그인</Checkbox>
                        </C.LoginInfoContainer>
                        <C.ButtonWrapper>
                            <C.LoginButton type="submit"><FaSignInAlt/>로그인</C.LoginButton>
                        </C.ButtonWrapper>
                    </C.LoginForm>
                    <HStack width="50%" margin="1rem 0">
                        <Separator width="100%" colorPalette="accent" size="lg" variant="dotted"/>
                        <Text flexShrink="0">또는</Text>
                        <Separator width="100%" colorPalette="accent" size="lg" variant="dotted"/>
                    </HStack>
                    <C.SocialLoginContainer>
                        <GoogleLogin />
                        <KakaoLogin />
                        <NaverLogin />
                    </C.SocialLoginContainer>
                    <C.SignUpContainer>
                        <Text color="textColor">
                            계정이 없으신가요?
                        </Text>
                        <C.SignUpButton type="button" onClick={onClickSignUpButton}>회원가입</C.SignUpButton>
                    </C.SignUpContainer>
                </C.MainContainer>
                <SignUpModal
                    open={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                />
            </C.Container>
        </>
    );
}