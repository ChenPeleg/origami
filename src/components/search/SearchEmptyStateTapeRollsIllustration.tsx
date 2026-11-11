const ROLLS = [
    { x: 66, color: '#E9805F' },
    { x: 176, color: '#3A9A97' },
    { x: 268, color: '#E8B94A' },
];

export interface SearchEmptyStateTapeRollsIllustrationProps {
    className?: string;
}

/**
 * SearchEmptyStateTapeRollsIllustration is a decorative picture of three washi tape rolls.
 */
export function SearchEmptyStateTapeRollsIllustration({
    className,
}: SearchEmptyStateTapeRollsIllustrationProps) {
    return (
        <svg
            viewBox="0 0 330 150"
            aria-hidden="true"
            className={['block', className || ''].filter(Boolean).join(' ')}
        >
            {ROLLS.map((roll) => (
                <g key={roll.x} transform={`translate(${roll.x},70)`}>
                    <circle r="58" cx="5" cy="8" fill="rgb(90 60 25 / 0.25)" />
                    <circle r="56" fill={roll.color} />
                    <circle
                        r="56"
                        fill="none"
                        stroke="rgb(255 255 255 / 0.45)"
                        strokeWidth="5"
                        strokeDasharray="5 11"
                    />
                    <circle r="34" fill="#D9C7A6" />
                    <circle r="29" fill="#E9D6B4" />
                </g>
            ))}
        </svg>
    );
}
