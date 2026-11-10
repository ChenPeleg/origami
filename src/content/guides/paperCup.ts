import type { Guide, Point } from '../../models/Guide';
import {
    DIAMOND,
    arrow,
    arrowBehind,
    dot,
    mountain,
    poly,
    valley,
} from './shapes';

/* paper-cup construction points */
const k = 0.4142;
const h = 0.5858;
const d = 0.1716;
const A: Point = [-1, 0];
const B: Point = [1, 0];
const C: Point = [0, 1];
const D: Point = [d, 0];
const D2: Point = [-d, 0];
const E: Point = [k, h];
const P: Point = [-k, h];

const FOLDED = { scale: 170, origin: [200, 245] as Point };
const CLOSE_UP = { scale: 230, origin: [200, 262] as Point };

export const paperCup: Guide = {
    id: 'cup',
    name: { en: 'Paper Cup', he: 'כוס נייר' },
    description: {
        en: 'A real cup that holds water. Five folds, no cutting.',
        he: 'כוס אמיתית שמחזיקה מים. חמישה קיפולים, בלי גזירה.',
    },
    coverAlt: {
        en: 'A folded paper cup, wide at the top, with a white flap folded over the front.',
        he: 'כוס נייר מקופלת, רחבה למעלה, עם דש לבן מקופל מלפנים.',
    },
    level: 1,
    sheets: 1,
    minutes: 5,
    tape: 'dots',
    paperColor: '#4FA9A5',
    flapColor: '#3A9390',
    requirementKeys: ['ציוד_דף_מרובע', 'ציוד_שולחן', 'ציוד_נייר_שעווה'],
    cover: {
        scale: 300,
        origin: [200, 238],
        shapes: [
            poly([D2, D, E, P], 'front'),
            poly([D, E, P], 'flap'),
            poly([D2, P, E], 'flap'),
            poly([P, E, [0, d]], 'back'),
        ],
    },
    steps: [
        {
            instruction: {
                en: 'Place the paper with one corner pointing at you, colored side down. Fold the bottom corner up to the top corner.',
                he: 'הניחו את הנייר כשפינה אחת פונה אליכם והצד הצבעוני למטה. קפלו את הפינה התחתונה אל הפינה העליונה.',
            },
            tip: { en: 'corner to corner!', he: 'פינה לפינה!' },
            diagram: {
                scale: 112,
                origin: [200, 150],
                shapes: [
                    poly(DIAMOND, 'back'),
                    poly(
                        [
                            [-1, 0],
                            [1, 0],
                            [0, -1],
                        ],
                        'backShade'
                    ),
                    valley([-1.12, 0], [1.12, 0]),
                    arrow([0, -0.82], [0, 0.82], 0.35),
                ],
            },
        },
        {
            instruction: {
                en: 'Fold the right corner across to the left edge. The top edge of the flap should lie flat, parallel to the bottom.',
                he: 'קפלו את הפינה הימנית אל הצלע השמאלית. הקצה העליון של הדש צריך להיות ישר, מקביל לתחתית.',
            },
            tip: { en: 'keep it level', he: 'לשמור על קו ישר' },
            diagram: {
                ...FOLDED,
                shapes: [
                    poly([A, B, C], 'front'),
                    valley([0.13, -0.1], [0.455, 0.686]),
                    arrow([0.93, 0.06], [-0.36, 0.6], 0.3),
                    dot(P),
                ],
            },
        },
        {
            instruction: {
                en: 'Fold the left corner across to the right corner of the shape, over the first flap.',
                he: 'קפלו את הפינה השמאלית אל הפינה הימנית של הצורה, מעל הדש הראשון.',
            },
            tip: { en: 'crease it hard!', he: 'להדק חזק!' },
            diagram: {
                ...FOLDED,
                shapes: [
                    poly([A, D, E, C], 'front'),
                    poly([D, E, P], 'flap'),
                    valley([-0.13, -0.1], [-0.455, 0.686]),
                    arrow([-0.93, 0.06], [0.36, 0.6], -0.3),
                    dot(E),
                ],
            },
        },
        {
            instruction: {
                en: 'Fold the front top corner down over the flaps.',
                he: 'קפלו את הפינה העליונה הקדמית כלפי מטה, מעל הדשים.',
            },
            tip: { en: 'one layer only', he: 'רק שכבה אחת' },
            diagram: {
                ...CLOSE_UP,
                shapes: [
                    poly([D2, D, E, C, P], 'front'),
                    poly([D, E, P], 'flap'),
                    poly([D2, P, E], 'flap'),
                    valley([-0.52, h], [0.52, h]),
                    arrow([0.06, 0.93], [0.03, 0.24], -0.4),
                ],
            },
        },
        {
            instruction: {
                en: 'Fold the other top corner down behind. Then open the cup from the top.',
                he: 'קפלו את הפינה העליונה השנייה לאחור. אחר כך פתחו את הכוס מלמעלה.',
            },
            tip: { en: 'this one goes behind', he: 'הפעם לאחור' },
            diagram: {
                ...CLOSE_UP,
                shapes: [
                    poly([P, E, C], 'front'),
                    poly([D2, D, E, P], 'front'),
                    poly([D, E, P], 'flap'),
                    poly([D2, P, E], 'flap'),
                    poly([P, E, [0, d]], 'back'),
                    mountain([-0.52, h], [0.52, h]),
                    arrowBehind([0.08, 0.95], [0.62, 0.4], -0.45),
                ],
            },
        },
    ],
};
