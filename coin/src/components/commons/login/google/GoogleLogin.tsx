import { useEffect } from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, googleProvider } from "../../util/firebase";
import * as S from "../Login.styles"
import GoogleIcon from '@mui/icons-material/Google';

export default function GoogleLogin(): JSX.Element {

    const onClickGoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;
            console.log("User Info:", user);
        } catch (error) {
            console.error("Error during login", error);
        }
    };

    return (
        <>
            <S.LoginButton onClick={onClickGoogleLogin}>
                <GoogleIcon />
                <p>Sign in with Google</p>
            </S.LoginButton>
        </>
    );
}