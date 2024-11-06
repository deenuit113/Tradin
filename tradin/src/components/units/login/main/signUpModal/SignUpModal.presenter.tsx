import { SignUpModalUIProps } from "./SignUpModal.types";
import * as S from "./SignUpModal.styles";
import { useTogglePasswordVisibility } from '../../../../../hooks/useTogglePasswordVisibility';
import { FaAngleDown, FaAngleUp, FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { PrivacyAgreement } from "./PrivacyAgreement";

export default function SignUpModalUI(props: SignUpModalUIProps): JSX.Element {
    const { register, handleSubmit, formState: { errors } } = props.formMethods;
    const { isPasswordVisible, togglePasswordVisibility } = useTogglePasswordVisibility();
    const { isPasswordVisible: isPasswordConfirmVisible, togglePasswordVisibility: togglePasswordConfirmVisibility } = useTogglePasswordVisibility();
    
    const [isAgreed, setIsAgreed] = useState(false);
    const [showAgreementError, setShowAgreementError] = useState(false);
    const [isAgreementOpen, setIsAgreementOpen] = useState(false);

    // 개인정보 동의 체크박스 변경 핸들러
    const handleAgreementChange = () => {
        setIsAgreed(!isAgreed);
        setShowAgreementError(false);
    };

    // 회원가입 폼 제출 핸들러
    const onSubmitForm = (data: any) => {
        if (!isAgreed) {
            setShowAgreementError(true);
            return;
        }
        props.onSubmit(data);
    };

    return (
        <S.ModalContainer>
            <S.ModalTitle>Tradin</S.ModalTitle>
            <S.SignUpForm onSubmit= {handleSubmit(onSubmitForm)}>
                <S.InputContainer>
                    <S.InputInfo
                        type="text"
                        id="email"
                        placeholder=""
                        {...register("email")}
                        defaultValue=""
                    />
                    <S.InputPlaceHolder htmlFor="email">이메일</S.InputPlaceHolder>
                </S.InputContainer>
                {errors?.email && <S.ErrorMsgWrapper>{errors.email.message}</S.ErrorMsgWrapper>}

                <S.InputContainer>
                    <S.InputInfo
                        type={isPasswordVisible ? "text" : "password"}
                        id="password"
                        placeholder=""
                        {...register("password")}
                        defaultValue=""
                        onKeyUp={props.checkCharCode}
                    />
                    <S.InputPlaceHolder htmlFor="password">비밀번호</S.InputPlaceHolder>
                    <S.PasswordToggleIcon onClick={togglePasswordVisibility}>
                        {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                    </S.PasswordToggleIcon>
                </S.InputContainer>
                {errors?.password && <S.ErrorMsgWrapper>{errors.password.message}</S.ErrorMsgWrapper>}

                <S.InputContainer>
                    <S.InputInfo
                        type={isPasswordConfirmVisible ? "text" : "password"}
                        id="passwordConfirm"
                        placeholder=""
                        {...register("passwordConfirm")}
                        defaultValue=""
                    />
                    <S.InputPlaceHolder htmlFor="passwordConfirm">비밀번호 확인</S.InputPlaceHolder>
                    <S.PasswordToggleIcon onClick={togglePasswordConfirmVisibility}>
                        {isPasswordConfirmVisible ? <FaEyeSlash /> : <FaEye />}
                    </S.PasswordToggleIcon>
                </S.InputContainer>
                {errors?.passwordConfirm && (
                    <S.ErrorMsgWrapper>{errors.passwordConfirm.message}</S.ErrorMsgWrapper>
                )}

                <S.InputContainer>
                    <S.InputInfo
                        type="text"
                        id="nickname"
                        placeholder=""
                        {...register("nickname")}
                        defaultValue=""
                    />
                    <S.InputPlaceHolder htmlFor="nickname">닉네임</S.InputPlaceHolder>
                </S.InputContainer>
                {errors?.nickname && <S.ErrorMsgWrapper>{errors.nickname.message}</S.ErrorMsgWrapper>}
            
                <S.ButtonWrapper>
                    <S.SignUpButton type="submit">회원가입</S.SignUpButton>
                </S.ButtonWrapper>
            </S.SignUpForm>

            <S.PrivacyAgreementCheckContainer>
                <S.PrivacyAgreementCheck
                    type="checkbox" 
                    id="agreement" 
                    checked={isAgreed} 
                    onChange={handleAgreementChange} 
                />
                <S.PrivacyAgreementLabel htmlFor="agreement">
                    [개인정보 수집 및 이용 동의]
                </S.PrivacyAgreementLabel>

                <S.PrivacyAgreementToggleButton 
                    type="button" 
                    onClick={() => setIsAgreementOpen(!isAgreementOpen)} 
                    style={{ marginLeft: '10px' }}
                >
                    {isAgreementOpen ? <FaAngleDown/> : <FaAngleUp/>}
                </S.PrivacyAgreementToggleButton>
            </S.PrivacyAgreementCheckContainer>

            {isAgreementOpen && (
                <PrivacyAgreement />
            )}

            {showAgreementError && (
                <S.PrivacyAgreementErrorMsgWrapper>
                개인정보 수집 및 이용에 동의하셔야 회원가입이 가능합니다.
                </S.PrivacyAgreementErrorMsgWrapper>
            )}
        </S.ModalContainer>
    );
};