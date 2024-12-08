import { useState } from 'react';
import { useBackTestContext } from '../contexts/BackTestContext';

export const useBackTestOptionDate = () => {
    const { startDate, setStartDate, endDate, setEndDate } = useBackTestContext();
    const [dateRange, setDateRange] = useState('1년');

    const handleDateRangeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedRange = e.target.value;
        setDateRange(selectedRange);

        const endDate = new Date();
        let startDate = new Date();

        switch (selectedRange) {
            case '1개월':
                startDate.setMonth(endDate.getMonth() - 1);
                break;
            case '3개월':
                startDate.setMonth(endDate.getMonth() - 3);
                break;
            case '6개월':
                startDate.setMonth(endDate.getMonth() - 6);
                break;
            case '1년':
                startDate.setFullYear(endDate.getFullYear() - 1);
                break;
            case '3년':
                startDate.setFullYear(endDate.getFullYear() - 3);
                break;
            case '5년':
                startDate.setFullYear(endDate.getFullYear() - 5);
                break;
            default:
                return;
        }

        setStartDate(startDate.toISOString().split('T')[0]);
        setEndDate(endDate.toISOString().split('T')[0]);
    };

    const handleStartDateChange = (date: Date | null) => {
        if (date) {
            const newStartDate = date.toISOString().split('T')[0];
            setStartDate(newStartDate);
            setDateRange('사용자 지정');
        } else {
            setStartDate('');
        }
    };

    const handleEndDateChange = (date: Date | null) => {
        if (date) {
            const newEndDate = date.toISOString().split('T')[0];
            setEndDate(newEndDate);
        } else {
            setEndDate('');
        }
    };

    return {
        dateRange,
        setDateRange,
        startDate,
        endDate,
        handleDateRangeChange,
        handleStartDateChange,
        handleEndDateChange
    };
};