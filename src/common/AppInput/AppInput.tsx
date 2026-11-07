import React from 'react';

interface TextInputProps {
    inputRef?: React.Ref<HTMLInputElement>;
}

export function AppInput({
    inputRef,
    ...props
}: React.HTMLProps<HTMLInputElement> & TextInputProps) {
    return (
        <input
            className={
                props.className ||
                'w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-400 dark:focus:ring-blue-400'
            }
            ref={inputRef}
            {...props}
        />
    );
}
