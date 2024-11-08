export interface PageNode {
    path: string;
    label: string;
    children?: PageNode[];
}

export const pageStructure: PageNode[] = [
    {
        path: '/',
        label: 'Home',
        children: [
            {
                path: '/spot',
                label: '현물',
                children: [
                    { path: '/spot/[num]', label: '현물 상세' }
                ]
            },
            {
                path: '/future',
                label: '선물',
                children: [
                    { path: '/future/[num]', label: '선물 상세' }
                ]
            },
            { path: '/login', label: '로그인' },
            { path: '/backtest', label: '백테스트'},
            { path: '/profile', label: '프로필'},
        ]
    }
];

export const findNodeByPath = (nodes: PageNode[], path: string): PageNode | null => {
    for (const node of nodes) {
        if (node.path === path) return node;
        if (node.children) {
            const found = findNodeByPath(node.children, path);
            if (found) return found;
        }
    }
    return null;
};

export const decodeSegment = (segment: string): string => {
    try {
        return decodeURIComponent(segment);
    } catch {
        return segment;
    }
};

export const encodeSegment = (segment: string): string => {
    return encodeURIComponent(segment);
};

export const getPathLabel = (path: string): string => {
    const segments = path.split('/').filter(Boolean);
    const lastSegment = decodeSegment(segments[segments.length - 1]);
    const node = findNodeByPath(pageStructure, `/${segments.join('/')}`);
    
    if (node) {
        return node.label.replace('[num]', lastSegment);
    }
    
    return lastSegment;
};