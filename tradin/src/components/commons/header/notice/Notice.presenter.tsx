import * as S from "./Notice.styles";
import { ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import { HeaderNoticeUIProps} from "./Notice.types";
import { useState } from "react";
import NoticeDrawer from "./modal/NoticeDrawer.container";

export default function HeaderNoticeUI(props: HeaderNoticeUIProps ) {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const onClickNoticeDrawer = () => {
        setIsModalOpen(prev => !prev);
    };

    // onClick={props.handleNotificationClick}
    return (
        <>
            <S.BellIconContainer
                ref={props.bellIconRef}
                onMouseDown={props.handleMouseDown}
                isDragging={props.isDragging}
                dragDistance={props.dragDistance}
            >
                <S.FaBellContainer>
                    <S.FaBellIcon
                        onClick={onClickNoticeDrawer}
                        className="Notification-Icon"
                    />
                </S.FaBellContainer>
                {props.unreadCount > 0 && (
                    <S.UnreadBadge>{props.unreadCount}</S.UnreadBadge>
                )}
                {props.isDragging && (
                    <S.VolumeSliderContainer>
                        <S.VolumeSlider volume={props.volume} />
                    </S.VolumeSliderContainer>
                )}
            </S.BellIconContainer>
            <NoticeDrawer
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
            <ToastContainer />
        </>
    );
}