import { useState, useEffect } from 'react';
import axios from 'axios';
import { Article } from '../components/commons/header/main/Header.types';

const NEWS_API_URL = `https://newsapi.org/v2/everything?q=bitcoin&apiKey=${process.env.NEXT_PUBLIC_NEWSAPI_API_KEY}`;

export const useFetchNews = () => {
    const [articles, setArticles] = useState<Article[]>([]);

    const fetchNews = async () => {
        try {
            const response = await axios.get(NEWS_API_URL);
            if (response.status !== 200) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = response.data;
            console.log("API Response:", data);

            const newsData: Article[] = data.articles
                .filter((article: any) => article.title !== '[Removed]')
                .map((article: any) => ({
                    title: article.title,
                    link: article.url,
                }));

            const uniqueArticles: Article[] = Array.from(
                new Map(newsData.map((item: Article) => [item.title, item])).values()
            );

            setArticles(uniqueArticles);
            localStorage.setItem('newsData', JSON.stringify(uniqueArticles));
        } catch (error) {
            console.error('Error fetching news:', error);
        }
    };

    useEffect(() => {
        const storedNews = localStorage.getItem('newsData');
        if (storedNews) {
            const parsedNews = JSON.parse(storedNews) as Article[];
            const filteredNews = parsedNews.filter(article => article.title !== '[Removed]');
            setArticles(filteredNews);
        }

        fetchNews();
        const interval = setInterval(fetchNews, 1800000);

        return () => clearInterval(interval);
    }, []);

    return articles;
};