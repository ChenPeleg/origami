import React from 'react';
import {
    AppWashiTape,
    type WashiTapePattern,
    type WashiTapePosition,
} from '../AppWashiTape/AppWashiTape';

export interface PaperScrapTape {
    pattern: WashiTapePattern;
    position: WashiTapePosition;
}

type AsProp<C extends React.ElementType> = {
    as?: C;
};

type PropsToOmit<C extends React.ElementType, P> = keyof (AsProp<C> & P);

type PolymorphicComponentProps<
    C extends React.ElementType,
    Props = object,
> = Props &
    AsProp<C> &
    Omit<React.ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>>;

export interface AppPaperScrapOwnProps {
    /** Washi tapes that hold the scrap, drawn on its top edge */
    tapes?: PaperScrapTape[];
    className?: string;
    children?: React.ReactNode;
}

export type AppPaperScrapProps<C extends React.ElementType = 'div'> =
    PolymorphicComponentProps<C, AppPaperScrapOwnProps>;

/**
 * AppPaperScrap is the content surface of the app: a scrap of off-white paper
 * with a soft shadow, optionally held by washi tape.
 * By default it renders a `<div>`, but can render as any element or component
 * (e.g. a router `Link`) via the `as` prop.
 */
export function AppPaperScrap<C extends React.ElementType = 'div'>({
    as,
    tapes = [],
    className,
    children,
    ...rest
}: AppPaperScrapProps<C>) {
    const Component: React.ElementType = as ?? 'div';

    const classes = [
        'shadow-scrap relative bg-scrap p-5 text-ink md:p-6',
        className || '',
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <Component className={classes} {...rest}>
            {tapes.map((tape) => (
                <AppWashiTape
                    key={`${tape.position}-${tape.pattern}`}
                    pattern={tape.pattern}
                    position={tape.position}
                />
            ))}
            {children}
        </Component>
    );
}
