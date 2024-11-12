export interface NoticeDrawerProps {
    open: boolean;
    onClose: () => void;
}

export interface MessageItemProps {
    type: string;
    message: string;
    isRead: boolean;
}