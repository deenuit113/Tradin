"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '../../../../contexts/UserContext';
import LoginPageUI from './Login.presenter';

export default function LoginPage(): JSX.Element {
    const router = useRouter();
    const { loggedIn } = useUser();

    const onClickMoveToMainPage = () => {
        router.push('/')
    }

    useEffect(() => {
        if (loggedIn) {
            router.push('/'); // 사용자가 로그인되어 있으면 메인 페이지로 리다이렉트
        }
    }, [loggedIn, router]);

    return(
        <>
            <LoginPageUI
                onClickMoveToMainPage={onClickMoveToMainPage}
            />
        </>
    );
}