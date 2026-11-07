import type { ReactNode } from 'react';

export interface AppFormFieldProps {
    children: ReactNode;
    label?: ReactNode;
    required?: boolean;
    helpText?: ReactNode;
    error?: ReactNode;
    htmlFor?: string;
}

export const AppFormField = ({
    children,
    label,
    required = false,
    helpText,
    error,
    htmlFor,
}: AppFormFieldProps) => {
    return (
        <div className="mb-6 w-full">
            {label ? (
                <label
                    htmlFor={htmlFor}
                    className="mb-2 block text-sm font-medium text-gray-700"
                >
                    <span>{label}</span>
                    {required ? (
                        <span className="ms-1 text-red-500" aria-hidden="true">
                            *
                        </span>
                    ) : null}
                </label>
            ) : null}
            {children}
            {helpText ? (
                <p className="mt-1 text-sm text-gray-500">{helpText}</p>
            ) : null}
            {error ? <p className="mt-1 text-sm text-red-500">{error}</p> : null}
        </div>
    );
};
