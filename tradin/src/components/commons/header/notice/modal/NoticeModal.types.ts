export interface Notification {
    message: string;
    read: boolean;
    timestamp: Date;
}

export interface NoticeModalProps {
    closeModal: () => void;
    notifications: Notification[];
    deleteNotification: (message: string) => void;
    setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>;
    showUnreadOnly: boolean;
    showReadOnly: boolean;
    setShowUnreadOnly: React.Dispatch<React.SetStateAction<boolean>>;
    setShowReadOnly: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface NoticeModalUIProps {
    showUnreadOnly: boolean;
    showReadOnly: boolean;
    modalRef: React.RefObject<HTMLDivElement>;
    setShowUnreadOnly: React.Dispatch<React.SetStateAction<boolean>>;
    setShowReadOnly: React.Dispatch<React.SetStateAction<boolean>>;
    handleDeleteAll: () => void;
    isNotification: boolean;
    notifications: Notification[];
    removingNotifications: string[];
    markAsRead: (message: string) => void;
    handleTouchStart: (event: React.TouchEvent, message: string) => void;
    handleTouchEnd: () => void;
    handleTouchMove: (event: React.TouchEvent) => void;
    handleMouseDown: (event: React.MouseEvent, message: string) => void;
    handleMouseMove: (event: React.MouseEvent) => void;
    handleMouseUp: () => void;
    dragX: number;
    draggedItem: string | null;
    handleRemoveNotification: (message: string) => void;
    getDeleteConfirmMessage: () => string;
    confirmDeleteAll: () => void;
    cancelDeleteAll: () => void;
    showDeleteConfirm: boolean;
}

export interface NoticeDrawerProps {
    open: boolean;
    onClose: () => void;
}

export interface MessageItemProps {
    type: string;
    message: string;
    isRead: boolean;
}