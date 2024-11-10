import * as S from "./SignUpModal.styles";
import { useTogglePasswordVisibility } from '../../../../../hooks/useTogglePasswordVisibility';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useRef, useState } from "react";
import { PrivacyAgreement } from "./PrivacyAgreement";
import { SignUpModalUIProps } from "./SignUpModal.types";
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from "@/components/ui/dialog"
import * as C from "./styles/components/signUpModal.components";
import { Input, Field, Collapsible, Box } from "@chakra-ui/react";
import { Checkbox } from "@/components/ui/checkbox";

export default function SignUpModalUI(props: SignUpModalUIProps): JSX.Element {
    const { register, handleSubmit, formState: { errors } } = props.formMethods;
    const { isPasswordVisible, togglePasswordVisibility } = useTogglePasswordVisibility();
    const { isPasswordVisible: isPasswordConfirmVisible, togglePasswordVisibility: togglePasswordConfirmVisibility } = useTogglePasswordVisibility();
    
    const [isAgreed, setIsAgreed] = useState(false);
    const [showAgreementError, setShowAgreementError] = useState(false);

    const ref = useRef<HTMLInputElement>(null);
    // 개인정보 동의 체크박스 변경 핸들러
    const handleAgreementChange = (checked: boolean) => {
        setIsAgreed(checked);
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
            <DialogRoot 
                open={props.open}
                onOpenChange={props.onClose}
                size="md"
                placement="center"
                motionPreset="slide-in-bottom"
                scrollBehavior="inside"
                initialFocusEl={() => ref.current}
            >
            <DialogContent>

                <DialogHeader bg="backgroundColor" borderRadius="5px 5px 0px 0px">
                    <DialogTitle>회원가입</DialogTitle>
                    <DialogCloseTrigger top="0" insetEnd="-12" bg="backgroundColor"/>
                </DialogHeader>

                <DialogBody bg="backgroundColor" borderRadius="0px 0px 5px 5px">
                    <C.SignUpForm onSubmit= {handleSubmit(onSubmitForm)}>

                        <Field.Root gap="0" marginBottom="1rem">
                        <C.InputContainer pos="relative" w="full">
                            <Input
                                type="email"
                                id="email"
                                placeholder=""
                                {...register("email")}
                                defaultValue=""
                                className="peer"
                                marginBottom="5px"
                                padding="10px 15px"
                                borderColor="borderColor"
                                ref={ref}
                            />
                            <Field.Label htmlFor="email" css={S.floatingStyles}>Email</Field.Label>
                        </C.InputContainer>
                        {errors?.email && <C.ErrorMsgWrapper>{errors.email.message}</C.ErrorMsgWrapper>}
                        </Field.Root>

                        <Field.Root gap="0" marginBottom="1rem">
                            <C.InputContainer>
                                <Input
                                    type={isPasswordVisible ? "text" : "password"}
                                    id="password"
                                    placeholder=""
                                    {...register("password")}
                                    defaultValue=""
                                    onKeyUp={props.checkCharCode}
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
                            {errors?.password && <C.ErrorMsgWrapper>{errors.password.message}</C.ErrorMsgWrapper>}
                        </Field.Root>
                        
                        <Field.Root gap="0" marginBottom="1rem">
                            <C.InputContainer>
                                <Input
                                    type={isPasswordConfirmVisible ? "text" : "password"}
                                    id="passwordConfirm"
                                    placeholder=""
                                    {...register("passwordConfirm")}
                                    defaultValue=""
                                    className="peer"
                                    marginBottom="5px"
                                    padding="10px 15px"
                                    borderColor="borderColor"
                                />
                                <Field.Label htmlFor="passwordConfirm" css={S.floatingStyles}>Password Confirm</Field.Label>
                                <C.PasswordToggleIcon onClick={togglePasswordConfirmVisibility}>
                                    {isPasswordConfirmVisible ? <FaEyeSlash /> : <FaEye />}
                                </C.PasswordToggleIcon>
                            </C.InputContainer>
                            {errors?.passwordConfirm && (
                                <C.ErrorMsgWrapper>{errors.passwordConfirm.message}</C.ErrorMsgWrapper>
                            )}
                        </Field.Root>
                        
                        <Field.Root gap="0">
                            <C.InputContainer>
                                <Input
                                    type="text"
                                    id="nickname"
                                    placeholder=""
                                    {...register("nickname")}
                                    defaultValue=""
                                    className="peer"
                                    marginBottom="5px"
                                    padding="10px 15px"
                                    borderColor="borderColor"
                                />
                                <Field.Label htmlFor="nickname" css={S.floatingStyles}>Nickname</Field.Label>
                            </C.InputContainer>
                            {errors?.nickname && <C.ErrorMsgWrapper>{errors.nickname.message}</C.ErrorMsgWrapper>}
                        </Field.Root>
                    
                        <C.ButtonWrapper>
                            <C.SignUpButton type="submit">회원가입</C.SignUpButton>
                        </C.ButtonWrapper>
                    </C.SignUpForm>

                    {showAgreementError && (
                        <C.AgreementErrorMsgWrapper>
                        개인정보 수집 및 이용에 동의하셔야 회원가입이 가능합니다.
                        </C.AgreementErrorMsgWrapper>
                    )}
                    
                    <Collapsible.Root unmountOnExit>
                    {/* 레이지 마운트 적용 */}
                        <Collapsible.Trigger paddingY="3" textAlign="center" width="100%">
                            [개인정보 수집 및 이용 동의]

                        </Collapsible.Trigger>
                        <Collapsible.Content textAlign="right">
                        <Box padding="4" borderColor="borderColor" borderRadius="5px" borderWidth="1px" textAlign="left">
                            <PrivacyAgreement />
                        </Box>
                        <Checkbox
                            id="agreement"
                            checked={isAgreed} 
                            onCheckedChange={(e) => handleAgreementChange(!!e.checked)}
                            marginY="3"
                            variant="outline"
                            borderColor="borderColor"
                        >
                            네, 동의합니다.
                        </Checkbox>
                        </Collapsible.Content>
                    </Collapsible.Root>
    
                </DialogBody>
            </DialogContent>
        </DialogRoot>
    );
};