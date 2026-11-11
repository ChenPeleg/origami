import type { ReactNode } from 'react';
import { Link } from 'react-router';
import { LayoutDirectionalArrow } from './LayoutDirectionalArrow';

export interface LayoutBackLinkProps {
    to: string;
    children: ReactNode;
}

/**
 * LayoutBackLink is the small "back to ..." link above a page.
 */
export function LayoutBackLink({ to, children }: LayoutBackLinkProps) {
    return (
        <Link
            to={to}
            className="text-muted hover:text-coral mb-1 inline-flex min-h-11 items-center gap-1.5 font-semibold no-underline"
        >
            <LayoutDirectionalArrow direction="back" /> {children}
        </Link>
    );
}
