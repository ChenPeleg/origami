import { Outlet } from 'react-router';
import Navbar from '../components/Navbar';

/**
 * Main Layout
 * Wraps all pages with a consistent navbar
 */
const MainLayout = () => {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
            <Navbar />
            <Outlet />
        </div>
    );
};

export default MainLayout;
