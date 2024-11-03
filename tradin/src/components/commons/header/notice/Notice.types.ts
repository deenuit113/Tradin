export interface Notification {
    message: string;
    read: boolean;
    timestamp: Date;
}

export interface HeaderNoticeUIProps {
    bellIconRef: React.RefObject<HTMLDivElement>;
    handleMouseDown: (event: React.MouseEvent) => void;
    isDragging: boolean;
    dragDistance: number;
    handleNotificationClick: () => void;
    unreadCount: number;
    volume: number;
    isModalOpen: boolean;
    closeModal: () => void;
    modalContent: JSX.Element;
}
