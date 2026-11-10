export interface AppProgressBarProps {
    /** Current value, between `min` and `max` */
    value: number;
    max: number;
    min?: number;
    /** Accessible name, e.g. "Step 2 of 5" */
    label: string;
    className?: string;
}

/**
 * AppProgressBar is a ruler-style progress bar with tick marks.
 * The fill starts at the inline start, so it mirrors in RTL.
 */
export function AppProgressBar({
    value,
    max,
    min = 0,
    label,
    className,
}: AppProgressBarProps) {
    const range = max - min;
    const ratio = range > 0 ? (value - min) / range : 0;
    const percent = Math.min(Math.max(ratio, 0), 1) * 100;

    return (
        <div
            role="progressbar"
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={value}
            aria-label={label}
            className={['bg-ruler relative h-3', className || '']
                .filter(Boolean)
                .join(' ')}
        >
            <span
                data-testid="progress-fill"
                className="bg-coral absolute inset-y-0 start-0 opacity-85 transition-[width] duration-200"
                style={{ width: `${percent}%` }}
            />
        </div>
    );
}
