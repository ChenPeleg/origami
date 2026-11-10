import { AppHandNote } from '../../common';
import { TapeRollsIllustration } from './TapeRollsIllustration';

export interface SearchEmptyStateProps {
    message: string;
}

/**
 * SearchEmptyState is shown when there is nothing to list:
 * before the user typed, and when nothing matches.
 */
export function SearchEmptyState({ message }: SearchEmptyStateProps) {
    return (
        <div className="flex flex-col items-center gap-2 py-[30px] text-center">
            <TapeRollsIllustration className="w-[250px] max-w-[80%]" />
            <AppHandNote>{message}</AppHandNote>
        </div>
    );
}
