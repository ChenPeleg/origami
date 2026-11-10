import React from 'react';

export type ButtonVariant =
    | 'primary'
    | 'secondary'
    | 'danger'
    | 'ghost'
    | 'link';
export type ButtonSize = 'sm' | 'md' | 'lg';

/** Cut card: square, ink border and a hard offset shadow that moves on hover and press. */
const cardClasses =
    'border-2 border-ink shadow-cut hover:-translate-x-px hover:-translate-y-px hover:shadow-cut-hover active:translate-x-0.5 active:translate-y-0.5 active:shadow-cut-press disabled:translate-x-0 disabled:translate-y-0 disabled:shadow-cut';

const variantClasses: Record<ButtonVariant, string> = {
    primary: `${cardClasses} bg-coral text-white`,
    secondary: `${cardClasses} bg-scrap text-ink`,
    danger: `${cardClasses} bg-ink text-scrap`,
    ghost: 'bg-transparent text-ink hover:bg-shade',
    link: 'bg-transparent p-0 text-coral underline-offset-4 hover:underline',
};

const sizeClasses: Record<ButtonSize, string> = {
    sm: 'min-h-11 px-3.5 text-[16px]',
    md: 'min-h-12 px-[22px] text-[19px]',
    lg: 'min-h-14 px-7 text-[21px]',
};

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

export interface AppButtonOwnProps {
    variant?: ButtonVariant;
    size?: ButtonSize;
    className?: string;
    children?: React.ReactNode;
}

export type AppButtonProps<C extends React.ElementType = 'button'> =
    PolymorphicComponentProps<C, AppButtonOwnProps>;

/**
 * AppButton is a polymorphic button component, styled as a piece of cut card.
 * By default it renders a `<button>` element, but can render as any element (e.g. `span`, `div`, `a`)
 * via the `as` prop. All native props of the target element are forwarded.
 */
export function AppButton<C extends React.ElementType = 'button'>({
    as,
    variant = 'primary',
    size = 'md',
    className,
    children,
    ...rest
}: AppButtonProps<C>) {
    const Component = as ?? 'button';

    const isLink = variant === 'link';

    const classes = [
        'font-display inline-flex cursor-pointer items-center justify-center gap-2 rounded-none leading-none whitespace-nowrap no-underline disabled:cursor-not-allowed disabled:opacity-45',
        !isLink && sizeClasses[size],
        variantClasses[variant],
        className || '',
    ]
        .filter(Boolean)
        .join(' ')
        .trim();

    return (
        <Component className={classes} {...rest}>
            {children}
        </Component>
    );
}
