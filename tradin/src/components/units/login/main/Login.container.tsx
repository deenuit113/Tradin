import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useRecoilValue } from 'recoil';
import { loggedIn } from '../../../commons/util/atoms';
import LoginPageUI from './Login.presenter';

export default function LoginPage(): JSX.Element {
    const router = useRouter();
    const isLoggedIn = useRecoilValue(loggedIn);

    useEffect(() => {
        if (isLoggedIn) {
            router.push('/'); // 사용자가 로그인되어 있으면 메인 페이지로 리다이렉트
        }
    }, [isLoggedIn, router]);

    return <LoginPageUI />;
}