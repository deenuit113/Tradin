import { useRouter } from 'next/navigation';
import SpotPageUI from "./Spot.presenter";

export default function SpotPage(): JSX.Element {
    const router = useRouter();

    const onClickMoveToSpotStrategy = (num: number) => {
        const queryString = `currentStrategy=${num}`;
        router.push(`./spot/${num}?${queryString}`);
    };

    return (
        <>
            <SpotPageUI
                onClickMoveToSpotStrategy={onClickMoveToSpotStrategy}
            />
        </>
    );
}