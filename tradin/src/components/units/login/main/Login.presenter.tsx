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
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Modal from "react-modal";
import { modalStyles } from "./signUpModal/SignUpModal.styles";
import SignUpModal from "./signUpModal/SignUpModal.container";

export default function LoginPageUI(props: LoginPageUIProps): JSX.Element {
    const [isModalOpen, setIsModalOPen] = useState<boolean>(false);
    
    const onClickSignUpButton = () => {
        setIsModalOPen(prev => !prev);
    };

    const onClickCloseModal = () => {
        setIsModalOPen(false);
    };

    useEffect(() => {
        Modal.setAppElement(document.getElementById('__next') || document.body);
    }, []);

    const modalContent = (
        <SignUpModal
        
        />
    );

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
            <S.Container>
                <S.MainContainer>
                    <S.PageTitle onClick={props.onClickMoveToMainPage}>Tradin</S.PageTitle>
                    <S.LoginForm onSubmit={handleSubmit(onSubmit)}>
                        <S.InputContainer>
                            <S.InputInfo
                                type="email"
                                id="email"
                                placeholder=""
                                {...register("email")}
                                defaultValue=""
                            />
                            <S.InputPlaceHolder htmlFor="email">이메일</S.InputPlaceHolder>

                        </S.InputContainer>
                        {errors.email && (
                            <S.ErrorMsgWrapper>{errors.email.message}</S.ErrorMsgWrapper>
                        )}
                        <S.InputContainer>
                            <S.InputInfo
                                type={isPasswordVisible ? "text" : "password"}
                                id="password"
                                placeholder=""
                                {...register("password")}
                                defaultValue=""
                                onKeyUp={checkCharCode}
                            />
                            <S.InputPlaceHolder htmlFor="password">비밀번호</S.InputPlaceHolder>
                            <S.PasswordToggleIcon onClick={togglePasswordVisibility}>
                                {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                            </S.PasswordToggleIcon>
                        </S.InputContainer>
                        {errors.password && (
                                <S.ErrorMsgWrapper>{errors.password.message}</S.ErrorMsgWrapper>
                        )}
                        <S.LoginInfoContainer>
                            <div>아이디 저장<input type="checkbox" checked={saveIdChecked} onChange={(e) => setSaveIdChecked(e.target.checked)}/></div>
                            <div>자동 로그인<input type="checkbox"/></div>
                        </S.LoginInfoContainer>
                        <S.ButtonWrapper>
                            <S.LoginButton type="submit">로그인</S.LoginButton>
                        </S.ButtonWrapper>
                    </S.LoginForm>
                    <S.Divider>
                        <S.DividerText>또는</S.DividerText>
                    </S.Divider>
                    <S.SocialLoginContainer>
                        <GoogleLogin />
                        <KakaoLogin />
                        <NaverLogin />
                    </S.SocialLoginContainer>
                    <S.SignUpContainer>
                        <S.SignUpLabel>
                            계정이 없으신가요?
                        </S.SignUpLabel>
                        <S.SignUpButton type="button" onClick={onClickSignUpButton}>회원가입</S.SignUpButton>
                    </S.SignUpContainer>
                </S.MainContainer>
                <Modal
                    isOpen={isModalOpen}
                    onRequestClose={onClickCloseModal}
                    contentLabel="Sing Up Modal"
                    style={modalStyles}
                >
                    {modalContent}
                </Modal>
            </S.Container>

        </>
    );
}