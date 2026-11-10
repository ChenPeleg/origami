import type { ReactNode } from 'react';
import { Link } from 'react-router';
import { DirectionalArrow } from './DirectionalArrow';

export interface BackLinkProps {
    to: string;
    children: ReactNode;
}

/**
 * BackLink is the small "back to ..." link above a page.
 */
export function BackLink({ to, children }: BackLinkProps) {
    return (
        <Link
            to={to}
            className="text-muted hover:text-coral mb-1 inline-flex min-h-11 items-center gap-1.5 font-semibold no-underline"
        >
            <DirectionalArrow direction="back" /> {children}
        </Link>
    );
}
