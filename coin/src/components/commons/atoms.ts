import { atom,RecoilEnv } from 'recoil';
import { v1 } from 'uuid';


RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;

export const darkMode = atom({
    key: `darkMode/${v1()}`,
    default: false,
});