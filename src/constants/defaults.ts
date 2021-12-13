import { Category, Housework } from '../utils/types';

const c000 = 'c000';
const c001 = 'c001';
const c002 = 'c002';
const c003 = 'c003';
const c004 = 'c004';
const c005 = 'c005';
const c006 = 'c006';
const c007 = 'c007';
const c008 = 'c008';
const c009 = 'c009';
const c010 = 'c010';

export const defaultCategories: Category = {
    [c000]: 'その他',
    [c001]: '洗濯',
    [c002]: '洗面所',
    [c003]: 'お風呂場',
    [c004]: 'トイレ',
    [c005]: 'キッチン',
    [c006]: '料理',
    [c007]: '掃除',
    [c008]: '季節ごと',
    [c009]: '猫ちゃん',
    [c010]: 'ごみ',
};

const hw000 = 'hw000';
const hw001 = 'hw001';
const hw002 = 'hw002';
const hw003 = 'hw003';
const hw004 = 'hw004';
const hw005 = 'hw005';
const hw006 = 'hw006';
const hw007 = 'hw007';
const hw008 = 'hw008';
const hw009 = 'hw009';
const hw010 = 'hw010';
const hw011 = 'hw011';
const hw012 = 'hw012';
const hw013 = 'hw013';

export const defaultHousework: Housework = {
    // その他
    [`${c000}-${hw000}`]: {
        id: hw000,
        points: 3,
        frequency: 'Temporary',
        categoryId: c000,
        description: 'その他',
    },
    [`${c000}-${hw001}`]: {
        id: hw001,
        points: 1,
        frequency: 'Temporary',
        categoryId: c000,
        description: '郵便物を取りに行く',
    },
    [`${c000}-${hw002}`]: {
        id: hw002,
        points: 1,
        frequency: 'Temporary',
        categoryId: c000,
        description: '郵便物を分けて捨てる',
    },
    [`${c000}-${hw003}`]: {
        id: hw003,
        points: 1,
        frequency: {
            times: 1,
            days: 14,
        },
        categoryId: c000,
        description: '植物への水やり',
    },
    [`${c000}-${hw004}`]: {
        id: hw004,
        points: 1,
        frequency: {
            times: 1,
            days: 1,
        },
        categoryId: c000,
        description: '除／加湿器のタンク替え',
    },
    [`${c000}-${hw005}`]: {
        id: hw005,
        points: 1,
        frequency: 'Temporary',
        categoryId: c000,
        description: 'ティッシュペーパーの補充',
    },
    [`${c000}-${hw006}`]: {
        id: hw006,
        points: 1,
        frequency: 'Temporary',
        categoryId: c000,
        description: 'ウェットティッシュの補充',
    },
    [`${c000}-${hw007}`]: {
        id: hw007,
        points: 1,
        frequency: 'Temporary',
        categoryId: c000,
        description: 'コロコロの補充',
    },
    // 洗濯
    [`${c001}-${hw000}`]: {
        id: hw000,
        points: 1,
        frequency: {
            times: 1,
            days: 3,
        },
        categoryId: c001,
        description: '洗濯機を回す',
    },
    [`${c001}-${hw001}`]: {
        id: hw001,
        points: 2,
        frequency: {
            times: 1,
            days: 3,
        },
        categoryId: c001,
        description: '洗濯物を干す',
    },
    [`${c001}-${hw002}`]: {
        id: hw002,
        points: 1,
        frequency: {
            times: 1,
            days: 3,
        },
        categoryId: c001,
        description: '洗濯物を取り込む',
    },
    [`${c001}-${hw003}`]: {
        id: hw003,
        points: 2,
        frequency: {
            times: 1,
            days: 3,
        },
        categoryId: c001,
        description: '洗濯物を畳む',
    },
    [`${c001}-${hw004}`]: {
        id: hw004,
        points: 1,
        frequency: {
            times: 1,
            days: 3,
        },
        categoryId: c001,
        description: '洗濯物をしまう',
    },
    [`${c001}-${hw005}`]: {
        id: hw005,
        points: 3,
        frequency: [
            {
                month: 1,
                day: 3,
            },
        ],
        categoryId: c001,
        description: '洗濯機のフィルタのホコリを取る',
    },
    [`${c001}-${hw006}`]: {
        id: hw006,
        points: 1,
        frequency: 'Temporary',
        categoryId: c001,
        description: '洗濯洗剤を詰め替える',
    },
    [`${c001}-${hw007}`]: {
        id: hw007,
        points: 1,
        frequency: 'Temporary',
        categoryId: c001,
        description: '柔軟剤を詰め替える',
    },
    // 洗面所
    [`${c002}-${hw000}`]: {
        id: hw000,
        points: 1,
        frequency: {
            times: 1,
            days: 7,
        },
        categoryId: c002,
        description: '鏡を拭く',
    },
    [`${c002}-${hw001}`]: {
        id: hw001,
        points: 1,
        frequency: {
            times: 1,
            days: 7,
        },
        categoryId: c002,
        description: 'タオルを替える',
    },
    [`${c002}-${hw002}`]: {
        id: hw002,
        points: 3,
        frequency: {
            times: 1,
            days: 14,
        },
        categoryId: c002,
        description: '洗面台の掃除',
    },
    [`${c002}-${hw003}`]: {
        id: hw003,
        points: 3,
        frequency: ['Monday'],
        categoryId: c002,
        description: '排水溝の掃除',
    },
    [`${c002}-${hw004}`]: {
        id: hw004,
        points: 1,
        frequency: {
            times: 1,
            days: 2,
        },
        categoryId: c002,
        description: '洗面所の床掃除',
    },
    // お風呂場
    [`${c003}-${hw000}`]: {
        id: hw000,
        points: 3,
        frequency: 'Temporary',
        categoryId: c003,
        description: '浴槽を洗う',
    },
    [`${c003}-${hw001}`]: {
        id: hw001,
        points: 2,
        frequency: 'Temporary',
        categoryId: c003,
        description: 'フタを洗う',
    },
    [`${c003}-${hw002}`]: {
        id: hw002,
        points: 3,
        frequency: 'Temporary',
        categoryId: c003,
        description: 'お風呂場の床を洗う',
    },
    [`${c003}-${hw003}`]: {
        id: hw003,
        points: 4,
        frequency: {
            times: 1,
            days: 30,
        },
        categoryId: c003,
        description: '排水溝のパーツを洗う',
    },
    [`${c003}-${hw004}`]: {
        id: hw004,
        points: 3,
        frequency: ['Monday', 'Thursday'],
        categoryId: c003,
        description: '髪の毛を取る',
    },
    [`${c003}-${hw005}`]: {
        id: hw005,
        points: 3,
        frequency: ['Monday', 'Thursday'],
        categoryId: c003,
        description: 'ネットを交換する',
    },
    [`${c003}-${hw006}`]: {
        id: hw006,
        points: 1,
        frequency: 'Temporary',
        categoryId: c003,
        description: 'カビキラーする',
    },
    // トイレ
    [`${c004}-${hw000}`]: {
        id: hw000,
        points: 5,
        frequency: {
            times: 1,
            days: 7,
        },
        categoryId: c004,
        description: 'トイレを拭く',
    },
    [`${c004}-${hw001}`]: {
        id: hw001,
        points: 2,
        frequency: {
            times: 1,
            days: 2,
        },
        categoryId: c004,
        description: 'トイレの床掃除',
    },
    [`${c004}-${hw002}`]: {
        id: hw002,
        points: 1,
        frequency: 'Temporary',
        categoryId: c004,
        description: 'トイレットペーパーの交換',
    },
    [`${c004}-${hw003}`]: {
        id: hw003,
        points: 1,
        frequency: 'Temporary',
        categoryId: c004,
        description: 'トイレスタンプする',
    },
    [`${c004}-${hw004}`]: {
        id: hw004,
        points: 1,
        frequency: {
            times: 1,
            days: 7,
        },
        categoryId: c004,
        description: 'タオルを替える',
    },
    // キッチン
    [`${c005}-${hw000}`]: {
        id: hw000,
        points: 3,
        frequency: {
            times: 1,
            days: 1,
        },
        categoryId: c005,
        description: '洗い物',
    },
    [`${c005}-${hw001}`]: {
        id: hw001,
        points: 1,
        frequency: null,
        categoryId: c005,
        description: '食器を拭く',
    },
    [`${c005}-${hw002}`]: {
        id: hw002,
        points: 2,
        frequency: {
            times: 1,
            days: 1,
        },
        categoryId: c005,
        description: 'シンクの水気を拭く',
    },
    [`${c005}-${hw003}`]: {
        id: hw003,
        points: 1,
        frequency: {
            times: 1,
            days: 1,
        },
        categoryId: c005,
        description: '食器をしまう',
    },
    [`${c005}-${hw004}`]: {
        id: hw004,
        points: 1,
        frequency: 'Temporary',
        categoryId: c005,
        description: '調味料の補充',
    },
    [`${c005}-${hw005}`]: {
        id: hw005,
        points: 1,
        frequency: {
            times: 1,
            days: 7,
        },
        categoryId: c005,
        description: 'キッチン壁の掃除',
    },
    [`${c005}-${hw006}`]: {
        id: hw006,
        points: 1,
        frequency: {
            times: 1,
            days: 1,
        },
        categoryId: c005,
        description: 'フライパン・調理器具などをしまう',
    },
    [`${c005}-${hw007}`]: {
        id: hw007,
        points: 2,
        frequency: {
            times: 1,
            days: 1,
        },
        categoryId: c005,
        description: 'IHの拭き掃除',
    },
    [`${c005}-${hw008}`]: {
        id: hw008,
        points: 1,
        frequency: {
            times: 1,
            days: 30,
        },
        categoryId: c005,
        description: '炊飯器の洗浄・掃除',
    },
    [`${c005}-${hw009}`]: {
        id: hw009,
        points: 1,
        frequency: {
            times: 1,
            days: 14,
        },
        categoryId: c005,
        description: '電子レンジの洗浄・掃除',
    },
    [`${c005}-${hw010}`]: {
        id: hw010,
        points: 1,
        frequency: {
            times: 1,
            days: 1,
        },
        categoryId: c005,
        description: 'コーヒーメーカーの掃除',
    },
    [`${c005}-${hw011}`]: {
        id: hw011,
        points: 3,
        frequency: ['Monday', 'Thursday'],
        categoryId: c005,
        description: 'ネットを交換する',
    },
    [`${c005}-${hw012}`]: {
        id: hw012,
        points: 2,
        frequency: [
            {
                month: 5,
                day: 1,
            },
            {
                month: 11,
                day: 1,
            },
        ],
        categoryId: c005,
        description: 'レンジフードのフィルタを交換する',
    },
    [`${c005}-${hw013}`]: {
        id: hw013,
        points: 1,
        frequency: {
            times: 1,
            days: 7,
        },
        categoryId: c005,
        description: 'トレイ、牛乳パックをリサイクル',
    },
    // 料理
    [`${c006}-${hw000}`]: {
        id: hw000,
        points: 3,
        frequency: ['Saturday'],
        categoryId: c006,
        description: '買い出し',
    },
    [`${c006}-${hw001}`]: {
        id: hw001,
        points: 1,
        frequency: ['Saturday'],
        categoryId: c006,
        description: '買い物した荷物を運ぶ',
    },
    [`${c006}-${hw002}`]: {
        id: hw002,
        points: 1,
        frequency: ['Saturday'],
        categoryId: c006,
        description: '買い物した荷物を冷蔵庫へ入れる',
    },
    [`${c006}-${hw003}`]: {
        id: hw003,
        points: 3,
        frequency: {
            times: 1,
            days: 1,
        },
        categoryId: c006,
        description: '料理する',
    },
    [`${c006}-${hw004}`]: {
        id: hw004,
        points: 1,
        frequency: {
            times: 1,
            days: 1,
        },
        categoryId: c006,
        description: '配膳する',
    },
    [`${c006}-${hw005}`]: {
        id: hw005,
        points: 1,
        frequency: {
            times: 1,
            days: 1,
        },
        categoryId: c006,
        description: 'テーブルを拭く',
    },
    [`${c006}-${hw006}`]: {
        id: hw006,
        points: 3,
        frequency: [
            {
                month: 1,
                day: 31,
            },
            {
                month: 4,
                day: 30,
            },
            {
                month: 7,
                day: 31,
            },
            {
                month: 10,
                day: 31,
            },
        ],
        categoryId: c006,
        description: '浄水器のフィルター交換',
    },
    [`${c006}-${hw007}`]: {
        id: hw007,
        points: 1,
        frequency: {
            times: 1,
            days: 30,
        },
        categoryId: c006,
        description: '食器用洗剤の補充',
    },
    [`${c006}-${hw008}`]: {
        id: hw008,
        points: 2,
        frequency: 'Temporary',
        categoryId: c006,
        description: '包丁を研ぐ',
    },
    [`${c006}-${hw009}`]: {
        id: hw009,
        points: 1,
        frequency: {
            times: 1,
            days: 14,
        },
        categoryId: c006,
        description: 'ランチョンマットを洗う',
    },
    // 掃除
    [`${c007}-${hw000}`]: {
        id: hw000,
        points: 2,
        frequency: {
            times: 1,
            days: 2,
        },
        categoryId: c007,
        description: 'リビングの床掃除',
    },
    [`${c007}-${hw001}`]: {
        id: hw001,
        points: 1,
        frequency: {
            times: 1,
            days: 2,
        },
        categoryId: c007,
        description: 'ベッドルームの床掃除',
    },
    [`${c007}-${hw002}`]: {
        id: hw002,
        points: 1,
        frequency: {
            times: 1,
            days: 2,
        },
        categoryId: c007,
        description: 'カーペットのコロコロ',
    },
    [`${c007}-${hw003}`]: {
        id: hw003,
        points: 1,
        frequency: {
            times: 1,
            days: 14,
        },
        categoryId: c007,
        description: 'カーペットの洗濯・乾燥',
    },
    [`${c007}-${hw004}`]: {
        id: hw004,
        points: 1,
        frequency: {
            times: 1,
            days: 7,
        },
        categoryId: c007,
        description: 'ホコリ落とし',
    },
    // 季節ごと
    [`${c008}-${hw000}`]: {
        id: hw000,
        points: 3,
        frequency: 'Temporary',
        categoryId: c008,
        description: '除／加湿器の洗浄',
    },
    [`${c008}-${hw001}`]: {
        id: hw001,
        points: 5,
        frequency: 'Temporary',
        categoryId: c008,
        description: 'エアコンの掃除',
    },
    [`${c008}-${hw002}`]: {
        id: hw002,
        points: 5,
        frequency: [
            {
                month: 2,
                day: 1,
            },
            {
                month: 8,
                day: 1,
            },
        ],
        categoryId: c008,
        description: '防虫剤の交換',
    },
    // 猫ちゃん
    [`${c009}-${hw000}`]: {
        id: hw000,
        points: 1,
        frequency: {
            times: 3,
            days: 1,
        },
        categoryId: c009,
        description: 'えさやり',
    },
    [`${c009}-${hw001}`]: {
        id: hw001,
        points: 1,
        frequency: {
            times: 3,
            days: 1,
        },
        categoryId: c009,
        description: 'えさ皿を洗う',
    },
    [`${c009}-${hw002}`]: {
        id: hw002,
        points: 1,
        frequency: {
            times: 1,
            days: 3,
        },
        categoryId: c009,
        description: 'えさ補充',
    },
    [`${c009}-${hw003}`]: {
        id: hw003,
        points: 3,
        frequency: {
            times: 1,
            days: 2,
        },
        categoryId: c009,
        description: '水替え',
    },
    [`${c009}-${hw004}`]: {
        id: hw004,
        points: 1,
        frequency: {
            times: 1,
            days: 1,
        },
        categoryId: c009,
        description: 'ブラッシング',
    },
    [`${c009}-${hw005}`]: {
        id: hw005,
        points: 1,
        frequency: {
            times: 1,
            days: 1,
        },
        categoryId: c009,
        description: 'うんち取る',
    },
    [`${c009}-${hw006}`]: {
        id: hw006,
        points: 1,
        frequency: {
            times: 1,
            days: 7,
        },
        categoryId: c009,
        description: '猫砂の補充',
    },
    [`${c009}-${hw007}`]: {
        id: hw007,
        points: 2,
        frequency: ['Thursday'],
        categoryId: c009,
        description: 'おしっこシートを替える',
    },
    [`${c009}-${hw008}`]: {
        id: hw008,
        points: 1,
        frequency: {
            times: 1,
            days: 3,
        },
        categoryId: c009,
        description: '涙拭く',
    },
    [`${c009}-${hw009}`]: {
        id: hw009,
        points: 2,
        frequency: {
            times: 1,
            days: 14,
        },
        categoryId: c009,
        description: '手の爪切り',
    },
    [`${c009}-${hw010}`]: {
        id: hw010,
        points: 2,
        frequency: {
            times: 1,
            days: 30,
        },
        categoryId: c009,
        description: '足の爪切り',
    },
    [`${c009}-${hw011}`]: {
        id: hw011,
        points: 4,
        frequency: {
            times: 1,
            days: 30,
        },
        categoryId: c009,
        description: 'トイレを洗う',
    },
    // ごみ
    [`${c010}-${hw000}`]: {
        id: hw000,
        points: 2,
        frequency: ['Monday', 'Thursday'],
        categoryId: c010,
        description: '可燃ごみ',
    },
    [`${c010}-${hw001}`]: {
        id: hw001,
        points: 1,
        frequency: ['Sunday'],
        categoryId: c010,
        description: 'プラスチック',
    },
    [`${c010}-${hw002}`]: {
        id: hw002,
        points: 1,
        frequency: ['Sunday'],
        categoryId: c010,
        description: '缶・ビン',
    },
    [`${c010}-${hw003}`]: {
        id: hw003,
        points: 1,
        frequency: ['Friday'],
        categoryId: c010,
        description: 'ペットボトル',
    },
    [`${c010}-${hw004}`]: {
        id: hw004,
        points: 1,
        frequency: ['Friday'],
        categoryId: c010,
        description: '段ボール',
    },
    [`${c010}-${hw005}`]: {
        id: hw005,
        points: 1,
        frequency: 'Temporary',
        categoryId: c010,
        description: '不燃ごみ',
    },
    [`${c010}-${hw006}`]: {
        id: hw006,
        points: 1,
        frequency: 'Temporary',
        categoryId: c010,
        description: '粗大ごみ',
    },
    [`${c010}-${hw007}`]: {
        id: hw007,
        points: 1,
        frequency: 'Temporary',
        categoryId: c010,
        description: '粗大ごみを申し込む',
    },
    [`${c010}-${hw008}`]: {
        id: hw008,
        points: 1,
        frequency: 'Temporary',
        categoryId: c010,
        description: '粗大ごみ券を買う',
    },
    [`${c010}-${hw009}`]: {
        id: hw009,
        points: 2,
        frequency: 'Temporary',
        categoryId: c010,
        description: 'ごみ箱を洗う',
    },
    [`${c010}-${hw010}`]: {
        id: hw010,
        points: 1,
        frequency: ['Sunday', 'Monday', 'Thursday'],
        categoryId: c010,
        description: 'ごみ袋を装着する',
    },
};
