import React from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost' | 'link';
export type ButtonSize = 'sm' | 'md' | 'lg';

const variantClasses: Record<ButtonVariant, string> = {
    primary:
        'bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-500 disabled:bg-blue-300',
    secondary:
        'bg-gray-100 text-gray-800 hover:bg-gray-200 focus-visible:ring-gray-400 disabled:bg-gray-50 disabled:text-gray-400',
    danger:
        'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500 disabled:bg-red-300',
    ghost:
        'bg-transparent text-gray-700 hover:bg-gray-100 focus-visible:ring-gray-400 disabled:text-gray-300',
    link:
        'bg-transparent text-blue-600 hover:underline focus-visible:ring-blue-500 disabled:text-blue-300 p-0',
};

const sizeClasses: Record<ButtonSize, string> = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-5 py-3 text-base',
};

type AsProp<C extends React.ElementType> = {
    as?: C;
};

type PropsToOmit<C extends React.ElementType, P> = keyof (AsProp<C> & P);

type PolymorphicComponentProps<C extends React.ElementType, Props = object> = Props &
    AsProp<C> &
    Omit<React.ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>>;

export interface AppButtonOwnProps {
    variant?: ButtonVariant;
    size?: ButtonSize;
    className?: string;
    children?: React.ReactNode;
}

export type AppButtonProps<C extends React.ElementType = 'button'> = PolymorphicComponentProps<
    C,
    AppButtonOwnProps
>;

/**
 * AppButton is a polymorphic button component.
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
        'inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed',
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
