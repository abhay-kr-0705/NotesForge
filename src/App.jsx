import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { Processor } from './components/Processor';
import { ThemeProvider } from './lib/ThemeContext';

import { AdminDashboard } from './components/pages/AdminDashboard';
import { useAnalytics } from './hooks/useAnalytics';

function App() {
    const [currentPage, setCurrentPage] = useState('home');

    // Handle hash routing for admin access
    useEffect(() => {
        if (window.location.hash === '#admin') {
            setCurrentPage('admin');
        }
    }, []);

    // Initialize Analytics Tracking
    useAnalytics(currentPage);

    const handleNavigate = (page) => {
        setCurrentPage(page);
        window.scrollTo(0, 0);
    };

    return (
        <ThemeProvider>
            {currentPage === 'admin' ? (
                <AdminDashboard onBack={() => handleNavigate('home')} />
            ) : (
                <Layout currentPage={currentPage} onNavigate={handleNavigate}>
                    <Processor currentPage={currentPage} onNavigate={handleNavigate} />
                </Layout>
            )}
        </ThemeProvider>
    );
}

export default App;
