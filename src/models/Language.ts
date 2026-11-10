export enum Language {
    Hebrew = 'he',
    English = 'en',
}

export type TextDirection = 'rtl' | 'ltr';

/** A text that exists in every supported language. */
export type LocalizedText = Record<Language, string>;
