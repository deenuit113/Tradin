import React from 'react';
import { PrivacyAgreementBox } from './SignUpModal.styles';

export const PrivacyAgreement: React.FC = () => {
    return (
        <PrivacyAgreementBox>
            Tradin은 회원가입을 위해 다음과 같이 개인정보를 수집하고자 합니다. 아래 내용을 자세히 읽어보신 후 동의 여부를 결정해 주시기 바랍니다.
            <br /><br />
            1. <strong>수집하는 개인정보 항목</strong><br />
            - 필수 항목: 이메일 주소, 비밀번호, 닉네임<br />
            - 선택 항목: 휴대폰 번호 (선택 항목은 입력하지 않더라도 서비스 이용에 제한이 없습니다.)<br /><br />
            2. <strong>개인정보 수집 및 이용 목적</strong><br />
            - 회원 가입 및 관리<br />
            - 서비스 제공<br />
            - 고객 지원<br /><br />
            3. <strong>개인정보 보유 및 이용 기간</strong><br />
            - 회원 탈퇴 시까지<br /><br />
            4. <strong>동의 거부 권리 및 불이익 안내</strong><br />
            귀하는 개인정보 수집 및 이용에 대한 동의를 거부할 권리가 있습니다.<br />
        </PrivacyAgreementBox>
    );
};