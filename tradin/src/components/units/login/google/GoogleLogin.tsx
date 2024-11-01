import { useEffect } from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
import { app } from "../../../commons/util/firebase";
import * as S from "../main/Login.styles";
import GoogleIcon from '@mui/icons-material/Google';
import { useRouter } from "next/navigation";
import { useUser } from "../../../../contexts/UserContext";

export default function GoogleLogin(): JSX.Element {
    const provider = new GoogleAuthProvider();
    const auth = getAuth(app);
    const { setUser, setLoggedIn } = useUser();
    const router = useRouter();

    const onClickGoogleLogin = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                setUser({
                    id: result.user.uid,
                    email: result.user.email,
                    displayName: result.user.displayName,
                    photoUrl: result.user.photoURL,
                });
                setLoggedIn(true);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser({
                    id: user.uid,
                    email: user.email,
                    displayName: user.displayName,
                    photoUrl: user.photoURL,
                });
                setLoggedIn(true);
                router.push('/');
            } else {
                setUser({
                    id: null,
                    email: null,
                    displayName: null,
                    photoUrl: null,
                });
                setLoggedIn(false);
            }
        });

        return () => unsubscribe();
    }, [auth, setUser]);

    return (
        <S.LoginButton onClick={onClickGoogleLogin}>
            <GoogleIcon />
            <p>구글 아이디로 로그인</p>
        </S.LoginButton>
    );
}