export type WashiTapePattern = 'stripes' | 'dots' | 'bands';
export type WashiTapePosition = 'left' | 'center' | 'right';

export interface AppWashiTapeProps {
    pattern: WashiTapePattern;
    /**
     * Where the tape sits on the top edge of its (relatively positioned) parent.
     * The positions are physical on purpose: tape is decoration and does not mirror in RTL.
     */
    position?: WashiTapePosition;
    className?: string;
}

const patternClasses: Record<WashiTapePattern, string> = {
    stripes: 'tape-stripes',
    dots: 'tape-dots',
    bands: 'tape-bands',
};

const positionClasses: Record<WashiTapePosition, string> = {
    left: 'left-[18px] -rotate-6',
    center: 'left-[calc(50%-56px)] -rotate-2 md:left-[calc(50%-70px)]',
    right: 'right-[18px] rotate-[5deg]',
};

/**
 * AppWashiTape is a strip of patterned tape with torn ends.
 * It is decoration only and is hidden from assistive technology.
 */
export function AppWashiTape({
    pattern,
    position = 'center',
    className,
}: AppWashiTapeProps) {
    const classes = [
        'tape-torn shadow-tape pointer-events-none absolute -top-3.5 h-7 w-28 opacity-[0.93] md:-top-[15px] md:h-[30px] md:w-[140px]',
        patternClasses[pattern],
        positionClasses[position],
        className || '',
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <span aria-hidden="true" data-pattern={pattern} className={classes} />
    );
}
