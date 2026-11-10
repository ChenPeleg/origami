import type { FormEvent } from 'react';
import { AppInput } from '../../common';
import { useTranslate } from '../../hooks/useTranslate';

export interface SearchFormProps {
    value: string;
    onChange: (value: string) => void;
}

const INPUT_ID = 'guide-search';

/**
 * SearchForm is the search field. Results update while the user types,
 * so submitting the form does nothing.
 */
export function SearchForm({ value, onChange }: SearchFormProps) {
    const { t } = useTranslate();

    return (
        <form
            role="search"
            className="mb-[30px] flex max-w-[560px] gap-3"
            onSubmit={(event: FormEvent) => event.preventDefault()}
        >
            <label htmlFor={INPUT_ID} className="sr-only">
                {t('חיפוש_תווית')}
            </label>
            <AppInput
                id={INPUT_ID}
                type="search"
                autoComplete="off"
                placeholder={t('חיפוש_מקום_מחזיק')}
                value={value}
                onChange={(event) =>
                    onChange((event.target as HTMLInputElement).value)
                }
            />
        </form>
    );
}
