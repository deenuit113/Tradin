export interface Notification {
    message: string;
    read: boolean;
    timestamp: Date;
}

export interface HeaderNoticeUIProps {
    handleNotificationClick: () => void;
    isModalOpen: boolean;
}
