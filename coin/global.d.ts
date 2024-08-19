interface KakaoAuth {
    login(params: {
        success: (authObj: any) => void;
        fail: (error: any) => void;
    }): void;
    logout(callback: (response: any) => void): void;
}

interface KakaoAPI {
    request(params: {
        url: string;
        success: (response: any) => void;
        fail: (error: any) => void;
    }): void;
}

interface Kakao {
    init(appKey: string): void;
    isInitialized(): boolean;
    Auth: KakaoAuth;
    API: KakaoAPI;
}

interface Window {
    Kakao?: Kakao;
}