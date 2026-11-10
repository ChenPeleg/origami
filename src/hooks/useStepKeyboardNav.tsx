import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useService } from '../services/provider/useService';
import { GuideFlowService, type StepView } from '../services/GuideFlow.service';
import { useTranslate } from './useTranslate';

const FORM_FIELD_TAGS = ['INPUT', 'TEXTAREA', 'SELECT'];

/**
 * Hook that lets the arrow keys move between the steps of a guide.
 * Which key goes where is decided by `GuideFlowService` (it depends on the
 * reading direction). Keys typed in form fields or with a modifier are ignored.
 */
export const useStepKeyboardNav = (stepView: StepView): void => {
    const flowService = useService(GuideFlowService);
    const navigate = useNavigate();
    const { direction } = useTranslate();

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            const target = event.target as HTMLElement | null;
            if (
                event.altKey ||
                event.ctrlKey ||
                event.metaKey ||
                (target && FORM_FIELD_TAGS.includes(target.tagName))
            ) {
                return;
            }
            const path = flowService.getKeyboardTarget(
                event.key,
                direction,
                stepView
            );
            if (path) {
                event.preventDefault();
                navigate(path);
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [flowService, navigate, direction, stepView]);
};
