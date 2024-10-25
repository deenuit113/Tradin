import { atom,RecoilEnv } from 'recoil';
import { v1 } from 'uuid';

RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;

export const darkMode = atom({
    key: `darkMode/${v1()}`,
    default: false,
});

export const notification = atom({
    key: `notification`,
    default: true,
});

export const currencyKRW = atom({
    key: 'CurrencyKRW',
    default: true,
})

interface UserInfo {
    id: string;
    email: string | null; // 사용자 이메일
    displayName: string | null; // 사용자 표시 이름
    photoUrl: string | null; // 사용자 프로필 사진 URL
}

export const loggedIn = atom({
    key: 'loggedIn',
    default: false,
})

export const userInfo = atom<UserInfo | null>({
    key: 'userInfo',
    default: null,
});