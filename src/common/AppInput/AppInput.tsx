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
                'font-body placeholder:text-muted border-ink bg-scrap text-ink min-h-12 w-full min-w-0 rounded-none border-2 px-3.5 text-[19px] shadow-[inset_2px_2px_0_rgb(43_33_24/0.08)]'
            }
            ref={inputRef}
            {...props}
        />
    );
}
