import type { FoldShape, Guide, Point } from '../../models/Guide';
import {
    DIAMOND,
    arrow,
    arrowBehind,
    eye,
    mountain,
    nose,
    poly,
    valley,
} from './shapes';

/* puppy: triangle pointing down, tip at 0,0 */
const a: Point = [-1, 1];
const b: Point = [1, 1];
const c: Point = [0, 0];
const tl: Point = [-0.15, 1];
const tr: Point = [0.15, 1];
const sl: Point = [-0.7, 0.7];
const sr: Point = [0.7, 0.7];
const el: Point = [-0.61, 0.286];
const er: Point = [0.61, 0.286];
const cl: Point = [-0.18, 0.18];
const cr: Point = [0.18, 0.18];

const FOLDED = { scale: 170, origin: [200, 255] as Point };
const FINISHED = { scale: 215, origin: [200, 268] as Point };

const finishedFace: FoldShape[] = [
    poly([tl, tr, sr, cr, cl, sl], 'front'),
    poly([tl, sl, el], 'flap'),
    poly([tr, sr, er], 'flap'),
    eye([-0.24, 0.62]),
    eye([0.24, 0.62]),
    nose([0, 0.3]),
];

export const puppyFace: Guide = {
    id: 'puppy',
    name: { en: 'Puppy Face', he: 'פרצוף כלבלב' },
    description: {
        en: 'A friendly puppy in four folds. A great first model for children.',
        he: 'כלבלב חמוד בארבעה קיפולים. מודל ראשון מצוין לילדים.',
    },
    coverAlt: {
        en: 'A folded paper puppy face with two floppy ears, two eyes and a nose.',
        he: 'פרצוף כלבלב מנייר מקופל, עם שתי אוזניים שמוטות, שתי עיניים ואף.',
    },
    level: 1,
    sheets: 1,
    minutes: 3,
    tape: 'stripes',
    paperColor: '#EE8D6C',
    flapColor: '#DC7350',
    requirementKeys: ['ציוד_דף_מרובע', 'ציוד_שולחן', 'ציוד_עט'],
    cover: { ...FINISHED, shapes: finishedFace },
    steps: [
        {
            instruction: {
                en: 'Place the paper with one corner pointing at you, colored side down. Fold the top corner down to the bottom corner.',
                he: 'הניחו את הנייר כשפינה אחת פונה אליכם והצד הצבעוני למטה. קפלו את הפינה העליונה אל הפינה התחתונה.',
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
                    arrow([0, 0.82], [0, -0.82], -0.35),
                ],
            },
        },
        {
            instruction: {
                en: 'Fold both side corners down to make the ears. Let them stick out a little.',
                he: 'קפלו את שתי הפינות הצדדיות כלפי מטה כדי ליצור אוזניים. תנו להן לבלוט מעט.',
            },
            tip: { en: 'floppy ears!', he: 'אוזניים שמוטות!' },
            diagram: {
                ...FOLDED,
                shapes: [
                    poly([a, b, c], 'front'),
                    valley([-0.04, 1.06], [-0.81, 0.64]),
                    valley([0.04, 1.06], [0.81, 0.64]),
                    arrow([-0.9, 0.93], [-0.6, 0.36], -0.45),
                    arrow([0.9, 0.93], [0.6, 0.36], 0.45),
                ],
            },
        },
        {
            instruction: {
                en: 'Fold the bottom tip behind to make a flat chin.',
                he: 'קפלו את הקצה התחתון לאחור כדי ליצור סנטר ישר.',
            },
            tip: { en: 'a mountain fold', he: 'זה קיפול הר' },
            diagram: {
                ...FOLDED,
                shapes: [
                    poly([tl, tr, sr, c, sl], 'front'),
                    poly([tl, sl, el], 'flap'),
                    poly([tr, sr, er], 'flap'),
                    mountain([-0.36, 0.18], [0.36, 0.18]),
                    arrowBehind([0.05, 0.02], [0.42, 0.34], 0.6),
                ],
            },
        },
        {
            instruction: {
                en: 'Draw two eyes and a nose. Your puppy is ready!',
                he: 'ציירו שתי עיניים ואף. הכלבלב מוכן!',
            },
            tip: { en: 'now give it a name', he: 'עכשיו תנו לו שם' },
            diagram: { ...FINISHED, shapes: finishedFace },
        },
    ],
};
