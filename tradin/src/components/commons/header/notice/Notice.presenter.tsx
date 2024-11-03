import Modal from "react-modal";
import * as S from "./Notice.styles";
import { modalStyles } from "./Notice.styles";
import { ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import { HeaderNoticeUIProps} from "./Notice.types";

export default function HeaderNoticeUI(props: HeaderNoticeUIProps ) {

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
                        onClick={props.handleNotificationClick}
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
            <Modal
                isOpen={props.isModalOpen}
                onRequestClose={props.closeModal}
                contentLabel="Notification Modal"
                style={modalStyles}
            >
                {props.modalContent}
            </Modal>
            <ToastContainer />
        </>
    );
}