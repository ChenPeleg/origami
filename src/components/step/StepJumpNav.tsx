import { Link } from 'react-router';
import type {
    JumpItemState,
    StepJumpItem,
} from '../../services/GuideFlow.service';
import { useTranslate } from '../../hooks/useTranslate';

export interface StepJumpNavProps {
    /** `jumpItems` of the step view */
    items: StepJumpItem[];
}

const stateClasses: Record<JumpItemState, string> = {
    current: 'bg-teal text-white',
    done: 'bg-shade text-ink',
    todo: 'bg-scrap text-ink',
};

/**
 * StepJumpNav is the row of numbered links that jump straight to a step.
 */
export function StepJumpNav({ items }: StepJumpNavProps) {
    const { t } = useTranslate();

    return (
        <nav aria-label={t('ניווט_קפיצה_לשלב')}>
            <ul className="mt-[26px] mb-0 flex list-none flex-wrap justify-center gap-2 p-0">
                {items.map((item) => (
                    <li key={item.number}>
                        <Link
                            to={item.path}
                            aria-current={
                                item.state === 'current' ? 'step' : undefined
                            }
                            aria-label={t('שלב_מספר', { step: item.number })}
                            className={`font-display border-ink grid size-11 place-items-center border-2 text-[17px] no-underline ${stateClasses[item.state]}`}
                        >
                            {item.number}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
