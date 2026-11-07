import React from 'react';

interface TextAreaProps {
    textAreaRef?: React.Ref<HTMLTextAreaElement>;
}

export function AppTextArea({
    textAreaRef,
    ...props
}: React.HTMLProps<HTMLTextAreaElement> & TextAreaProps) {
    return (
        <textarea
            className={
                props.className ||
                'w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500'
            }
            ref={textAreaRef}
            {...props}
        />
    );
}
