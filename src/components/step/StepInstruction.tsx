import { AppHandNote } from '../../common';

export interface StepInstructionProps {
    instruction: string;
    /** A short handwritten hint */
    tip: string;
}

/**
 * StepInstruction is the text of a folding step and its handwritten tip.
 */
export function StepInstruction({ instruction, tip }: StepInstructionProps) {
    return (
        <>
            <p className="m-0 text-[21px] leading-normal">{instruction}</p>
            <AppHandNote className="mt-3 origin-left -rotate-2 rtl:origin-right rtl:rotate-2">
                {tip}
            </AppHandNote>
        </>
    );
}
