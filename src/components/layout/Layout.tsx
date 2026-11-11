import { Outlet } from 'react-router';
import LayoutNavbar from './LayoutNavbar';
import { LayoutSkipLink } from './LayoutSkipLink';
import { LayoutFooter } from './LayoutFooter';

const MAIN_ID = 'main';

/**
 * Main Layout
 * Wraps all pages with the birch table background, the skip link,
 * the navbar and the footer
 */
const Layout = () => {
    return (
        <div className="bg-birch font-body text-ink flex min-h-screen flex-col text-[18px] leading-[1.55]">
            <LayoutSkipLink targetId={MAIN_ID} />
            <LayoutNavbar />
            <main
                id={MAIN_ID}
                tabIndex={-1}
                className="mx-auto w-full max-w-[1120px] flex-1 px-4 pt-7 pb-14 outline-none md:px-8 md:pt-11 md:pb-20"
            >
                <Outlet />
            </main>
            <LayoutFooter />
        </div>
    );
};

export default Layout;
