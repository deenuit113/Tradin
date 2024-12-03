import React, { Suspense } from 'react';
import * as C from "./styles/NewsWidget.components"
import { Skeleton } from '@/components/ui/skeleton';

interface NewsData {
    id: number;
    image: string;
    title: string;
    content: string;
    author: string;
}

interface NewsWidgetContentProps {
    news: NewsData;
}

const NewsWidgetContent: React.FC<NewsWidgetContentProps> = ({ news }) => {
    return (
        <C.NewsWidget>
            <Suspense fallback={<Skeleton/>}>
                <C.NewsImage src={news.image} alt={news.title} />
            </Suspense>
            <C.NewsTitle>{news.title}</C.NewsTitle>
            <C.NewsAuthor>{news.author}</C.NewsAuthor>
        </C.NewsWidget>
    );
}

export default NewsWidgetContent;