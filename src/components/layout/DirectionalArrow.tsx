import { useTranslate } from '../../hooks/useTranslate';

export interface DirectionalArrowProps {
    /** `back` points to where the user came from, `forward` to what comes next */
    direction: 'back' | 'forward';
}

/**
 * DirectionalArrow is a decorative arrow that follows the reading direction:
 * "forward" points right in LTR and left in RTL.
 * It is the one place where UI arrows are mirrored.
 */
export function DirectionalArrow({ direction }: DirectionalArrowProps) {
    const { direction: textDirection } = useTranslate();
    const pointsRight = (direction === 'forward') === (textDirection === 'ltr');

    return <span aria-hidden="true">{pointsRight ? '→' : '←'}</span>;
}
