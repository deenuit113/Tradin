import { useState } from "react";
import HeaderNoticeUI from "./Notice.presenter";

export default function HeaderNotice() {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const handleNotificationClick = () => {
        setIsModalOpen(prev => !prev);
    };

    return (
        <>
            <HeaderNoticeUI
                handleNotificationClick={handleNotificationClick}
                isModalOpen={isModalOpen}
            />
        </>
    );
}