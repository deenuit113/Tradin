import { useRouter } from 'next/navigation';
import FuturePageUI from "./Future.presenter";

export default function FuturePage(): JSX.Element {
    const router = useRouter();

    const onClickMoveToFutureStrategy = (num: number) => {
        const queryString = `currentStrategy=${num}`;
        router.push(`./future/${num}?${queryString}`);
    };

    return (
        <>
            <FuturePageUI
                onClickMoveToFutureStrategy={onClickMoveToFutureStrategy}
            />
        </>
    );
}