import { useEffect } from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
import { app } from "../../../commons/util/firebase";
import * as S from "../main/Login.styles";
import GoogleIcon from '@mui/icons-material/Google';
import { useRecoilState } from 'recoil';
import { userInfo } from "../../../commons/util/atoms";
import { useRouter } from "next/navigation";

export default function GoogleLogin(): JSX.Element {
    const provider = new GoogleAuthProvider();
    const auth = getAuth(app);
    const [userData, setUserData] = useRecoilState(userInfo);
    const router = useRouter();

    const onClickGoogleLogin = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                setUserData({
                    id: result.user.uid,
                    email: result.user.email,
                    displayName: result.user.displayName,
                    photoUrl: result.user.photoURL,
                });
            })
            .catch((error) => {
                console.error(error);
            });
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserData({
                    id: user.uid,
                    email: user.email,
                    displayName: user.displayName,
                    photoUrl: user.photoURL,
                });
                router.push('/');
            } else {
                setUserData(null);
            }
        });

        return () => unsubscribe();
    }, [auth, setUserData]);

    return (
        <S.LoginButton onClick={onClickGoogleLogin}>
            <GoogleIcon />
            <p>구글 아이디로 로그인</p>
        </S.LoginButton>
    );
}