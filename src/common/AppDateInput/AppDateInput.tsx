import React from 'react';

interface DateInputProps {
    inputRef?: React.Ref<HTMLInputElement>;
}

export function AppDateInput({
    inputRef,
    ...props
}: React.HTMLProps<HTMLInputElement> & DateInputProps) {
    return (
        <input
            type="date"
            className={
                props.className ||
                'w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500'
            }
            ref={inputRef}
            {...props}
        />
    );
}
