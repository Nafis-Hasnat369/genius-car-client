import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Pages/Shared/Header/Header';
import Footer from '../Pages/Shared/Footer/Footer';
import { Toaster } from 'react-hot-toast';

const Main = () => {
    return (
        <div>
            <Toaster position="bottom-right" reverseOrder={true} />
            <Header />
            <Outlet />
            <Footer />
        </div>
    );
};

export default Main;