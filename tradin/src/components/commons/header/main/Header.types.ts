export interface Article {
    title: string;
    link: string;
}

export interface HeaderUIProps {
    handleTitleClick: () => void;
    currentAnnouncement: number;
    onClickSignOut: () => void;
    onClickMoveToProfile: () => void;
    onClickMoveToLogin: () => void;
    articles: Article[];
}