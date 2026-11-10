import { Outlet } from 'react-router';
import Navbar from '../components/layout/Navbar';
import { SkipLink } from '../components/layout/SkipLink';
import { AppFooter } from '../components/layout/AppFooter';

const MAIN_ID = 'main';

/**
 * Main Layout
 * Wraps all pages with the birch table background, the skip link,
 * the navbar and the footer
 */
const MainLayout = () => {
    return (
        <div className="bg-birch font-body text-ink flex min-h-screen flex-col text-[18px] leading-[1.55]">
            <SkipLink targetId={MAIN_ID} />
            <Navbar />
            <main
                id={MAIN_ID}
                tabIndex={-1}
                className="mx-auto w-full max-w-[1120px] flex-1 px-4 pt-7 pb-14 outline-none md:px-8 md:pt-11 md:pb-20"
            >
                <Outlet />
            </main>
            <AppFooter />
        </div>
    );
};

export default MainLayout;
