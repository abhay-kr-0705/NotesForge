import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { Processor } from './components/Processor';

function App() {
    const [currentPage, setCurrentPage] = useState('home');

    const handleNavigate = (page) => {
        setCurrentPage(page);
        window.scrollTo(0, 0);
    };

    return (
        <Layout currentPage={currentPage} onNavigate={handleNavigate}>
            <Processor currentPage={currentPage} onNavigate={handleNavigate} />
        </Layout>
    );
}

export default App;
