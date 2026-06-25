import React, { createContext, useContext, useState, useEffect } from 'react';
import { getPublicProfile } from '../api/api';

const PortfolioContext = createContext();

export const PortfolioProvider = ({ children }) => {
    const [portfolio, setPortfolio] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchPortfolio = async () => {
        try {
            const data = await getPublicProfile();
            setPortfolio(data);
        } catch (error) {
            console.error('Failed to fetch portfolio:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPortfolio();
    }, []);

    const updatePortfolio = (data) => {
        setPortfolio(data);
    };

    return (
        <PortfolioContext.Provider value={{ portfolio, loading, updatePortfolio, refresh: fetchPortfolio }}>
            {children}
        </PortfolioContext.Provider>
    );
};

export const usePortfolio = () => useContext(PortfolioContext);