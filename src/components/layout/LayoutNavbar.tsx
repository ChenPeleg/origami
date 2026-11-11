import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router';
import { AppButton } from '../../common';
import { useService } from '../../services/provider/useService';
import { GuideFlowService } from '../../services/GuideFlow.service';
import { useTranslate } from '../../hooks/useTranslate';
import { LayoutNavbarBrandLogo } from './LayoutNavbarBrandLogo';
import { LayoutNavbarLanguageToggle } from './LayoutNavbarLanguageToggle';

const LINKS_ID = 'navbar-links';

const MenuIcon = () => (
    <svg viewBox="0 0 22 22" aria-hidden="true" className="block size-[22px]">
        <path
            d="M2 5h18M2 11h18M2 17h18"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="square"
        />
    </svg>
);

/**
 * LayoutNavbar Component
 * Displayed on every screen: logo (home), Catalog, Search and the language switch.
 * Below the desktop breakpoint the links sit in a menu that a button opens and closes.
 */
const LayoutNavbar = () => {
    const flowService = useService(GuideFlowService);
    const { t } = useTranslate();
    const { pathname } = useLocation();
    // The menu is open only on the page where it was opened,
    // so it closes by itself when the route changes.
    const [menuOpenOnPath, setMenuOpenOnPath] = useState<string | null>(null);
    const isMenuOpen = menuOpenOnPath === pathname;

    const closeMenu = () => setMenuOpenOnPath(null);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setMenuOpenOnPath(null);
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, []);

    const links = [
        { to: flowService.paths.catalog(), label: t('ניווט_קטלוג') },
        { to: flowService.paths.search(), label: t('ניווט_חיפוש') },
    ];

    return (
        <header className="shadow-bar border-ink bg-scrap text-ink sticky top-0 z-20 border-b-2">
            <div className="mx-auto flex min-h-[60px] max-w-[1120px] items-center gap-3 px-4 md:min-h-[68px] md:px-8">
                <LayoutNavbarBrandLogo />
                <nav aria-label={t('ניווט_ראשי')}>
                    <ul
                        id={LINKS_ID}
                        className={`m-0 list-none md:static md:flex md:gap-1 md:border-0 md:bg-transparent md:p-0 md:shadow-none ${
                            isMenuOpen
                                ? 'shadow-bar border-ink bg-scrap absolute inset-x-0 top-full block border-b-2 px-4 pt-2 pb-3.5'
                                : 'hidden p-0'
                        }`}
                    >
                        {links.map((link) => (
                            <li key={link.to}>
                                <NavLink
                                    to={link.to}
                                    end
                                    onClick={closeMenu}
                                    className={({ isActive }) =>
                                        `font-display border-ink/25 hover:text-coral relative flex min-h-[52px] items-center border-b border-dashed px-3.5 text-[21px] leading-[normal] no-underline md:min-h-11 md:border-0 md:text-[18px] ${
                                            isActive
                                                ? 'after:tape-underline after:absolute after:inset-x-2.5 after:bottom-1 after:h-2 after:opacity-90'
                                                : ''
                                        }`
                                    }
                                >
                                    {link.label}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>
                <LayoutNavbarLanguageToggle />
                <AppButton
                    type="button"
                    variant="secondary"
                    size="sm"
                    className="w-12 md:hidden"
                    aria-label={t('ניווט_תפריט')}
                    aria-expanded={isMenuOpen}
                    aria-controls={LINKS_ID}
                    onClick={() =>
                        setMenuOpenOnPath(isMenuOpen ? null : pathname)
                    }
                >
                    <MenuIcon />
                </AppButton>
            </div>
        </header>
    );
};

export default LayoutNavbar;
