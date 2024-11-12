import { ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import { HeaderNoticeUIProps} from "./Notice.types";
import { useState } from "react";
import NoticeDrawer from "./modal/NoticeDrawer.container";
import { Float, IconButton, Circle } from "@chakra-ui/react";
import { FaBell } from "react-icons/fa";
import * as C from "./styles/components/Notice.components"


export default function HeaderNoticeUI(props: HeaderNoticeUIProps) {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const onClickNoticeDrawer = () => {
        setIsModalOpen(prev => !prev);
    };

    return (
        <>
            <C.BellIconButton
                onClick={onClickNoticeDrawer}
                size="lg"
                variant="ghost"
            >
                <FaBell/>
                <Float offset= "3">
                    <Circle size="1" bg="red" color="white" />
                </Float>
            </C.BellIconButton>

            <NoticeDrawer
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
            <ToastContainer 
                onClick={onClickNoticeDrawer}
            />
        </>
    );
}