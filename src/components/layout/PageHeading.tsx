import { useEffect, useRef, type ReactNode } from 'react';
import { useLocation } from 'react-router';
import { useService } from '../../services/provider/useService';
import { PageService } from '../../services/Page.service';
import { useTranslate } from '../../hooks/useTranslate';

export interface PageHeadingProps {
    /** The heading as plain text. It is also used for the document title. */
    title: string;
    /** `page` is the large screen title, `step` the compact one of a folding step */
    size?: 'page' | 'step';
    className?: string;
    /** Custom heading content. Defaults to `title`. */
    children?: ReactNode;
}

const sizeClasses = {
    page: 'text-[clamp(34px,7vw,58px)] leading-[1.05]',
    step: 'text-[28px] leading-none',
};

/**
 * PageHeading is the single `<h1>` of a page.
 * It keeps the document title in sync, and after the user navigates to a new
 * page it scrolls to the top and takes focus, so keyboard and screen-reader
 * users land on the new content. The rules live in `PageService`.
 */
export function PageHeading({
    title,
    size = 'page',
    className,
    children,
}: PageHeadingProps) {
    const pageService = useService(PageService);
    const { language } = useTranslate();
    const { pathname } = useLocation();
    const headingRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        pageService.setTitle(title, language);
    }, [pageService, title, language]);

    useEffect(() => {
        if (pageService.enterPage(pathname)) {
            pageService.scrollToTop();
            headingRef.current?.focus({ preventScroll: true });
        }
    }, [pageService, pathname]);

    const classes = [
        'font-display m-0 font-normal outline-none',
        sizeClasses[size],
        className || '',
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <h1 ref={headingRef} tabIndex={-1} className={classes}>
            {children ?? title}
        </h1>
    );
}
