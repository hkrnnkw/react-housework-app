import { House } from '../contexts/houses/constants'
import {
  Category,
  EVERY_X_DAYS,
  SPECIFIC_DATE,
  SPECIFIC_DAY_OF_WEEK,
  TEMPORARY,
} from '../utils/types'

const c000 = 'c000'
const c001 = 'c001'
const c002 = 'c002'
const c003 = 'c003'
const c004 = 'c004'
const c005 = 'c005'
const c006 = 'c006'
const c007 = 'c007'
const c008 = 'c008'
const c009 = 'c009'
const c010 = 'c010'

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
}

const hw000 = 'hw000'
const hw001 = 'hw001'
const hw002 = 'hw002'
const hw003 = 'hw003'
const hw004 = 'hw004'
const hw005 = 'hw005'
const hw006 = 'hw006'
const hw007 = 'hw007'
const hw008 = 'hw008'
const hw009 = 'hw009'
const hw010 = 'hw010'
const hw011 = 'hw011'
const hw012 = 'hw012'
const hw013 = 'hw013'

export const defaultHousework: House['housework'] = {
  // その他
  [`${c000}-${hw000}`]: {
    id: hw000,
    points: 3,
    frequency: TEMPORARY,
    frequencyType: TEMPORARY,
    categoryId: c000,
    description: 'その他',
    memberId: null,
  },
  [`${c000}-${hw001}`]: {
    id: hw001,
    points: 1,
    frequency: TEMPORARY,
    frequencyType: TEMPORARY,
    categoryId: c000,
    description: '郵便物を取りに行く',
    memberId: null,
  },
  [`${c000}-${hw002}`]: {
    id: hw002,
    points: 1,
    frequency: TEMPORARY,
    frequencyType: TEMPORARY,
    categoryId: c000,
    description: '郵便物を分けて捨てる',
    memberId: null,
  },
  [`${c000}-${hw003}`]: {
    id: hw003,
    points: 1,
    frequency: {
      times: 1,
      days: 14,
    },
    frequencyType: EVERY_X_DAYS,
    categoryId: c000,
    description: '植物への水やり',
    memberId: null,
  },
  [`${c000}-${hw004}`]: {
    id: hw004,
    points: 1,
    frequency: {
      times: 1,
      days: 1,
    },
    frequencyType: EVERY_X_DAYS,
    categoryId: c000,
    description: '除／加湿器のタンク替え',
    memberId: null,
  },
  [`${c000}-${hw005}`]: {
    id: hw005,
    points: 1,
    frequency: TEMPORARY,
    frequencyType: TEMPORARY,
    categoryId: c000,
    description: 'ティッシュペーパーの補充',
    memberId: null,
  },
  [`${c000}-${hw006}`]: {
    id: hw006,
    points: 1,
    frequency: TEMPORARY,
    frequencyType: TEMPORARY,
    categoryId: c000,
    description: 'ウェットティッシュの補充',
    memberId: null,
  },
  [`${c000}-${hw007}`]: {
    id: hw007,
    points: 1,
    frequency: TEMPORARY,
    frequencyType: TEMPORARY,
    categoryId: c000,
    description: 'コロコロの補充',
    memberId: null,
  },
  // 洗濯
  [`${c001}-${hw000}`]: {
    id: hw000,
    points: 1,
    frequency: {
      times: 1,
      days: 3,
    },
    frequencyType: EVERY_X_DAYS,
    categoryId: c001,
    description: '洗濯機を回す',
    memberId: null,
  },
  [`${c001}-${hw001}`]: {
    id: hw001,
    points: 2,
    frequency: {
      times: 1,
      days: 3,
    },
    frequencyType: EVERY_X_DAYS,
    categoryId: c001,
    description: '洗濯物を干す',
    memberId: null,
  },
  [`${c001}-${hw002}`]: {
    id: hw002,
    points: 1,
    frequency: {
      times: 1,
      days: 3,
    },
    frequencyType: EVERY_X_DAYS,
    categoryId: c001,
    description: '洗濯物を取り込む',
    memberId: null,
  },
  [`${c001}-${hw003}`]: {
    id: hw003,
    points: 2,
    frequency: {
      times: 1,
      days: 3,
    },
    frequencyType: EVERY_X_DAYS,
    categoryId: c001,
    description: '洗濯物を畳む',
    memberId: null,
  },
  [`${c001}-${hw004}`]: {
    id: hw004,
    points: 1,
    frequency: {
      times: 1,
      days: 3,
    },
    frequencyType: EVERY_X_DAYS,
    categoryId: c001,
    description: '洗濯物をしまう',
    memberId: null,
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
    frequencyType: SPECIFIC_DATE,
    categoryId: c001,
    description: '洗濯機のフィルタのホコリを取る',
    memberId: null,
  },
  [`${c001}-${hw006}`]: {
    id: hw006,
    points: 1,
    frequency: TEMPORARY,
    frequencyType: TEMPORARY,
    categoryId: c001,
    description: '洗濯洗剤を詰め替える',
    memberId: null,
  },
  [`${c001}-${hw007}`]: {
    id: hw007,
    points: 1,
    frequency: TEMPORARY,
    frequencyType: TEMPORARY,
    categoryId: c001,
    description: '柔軟剤を詰め替える',
    memberId: null,
  },
  // 洗面所
  [`${c002}-${hw000}`]: {
    id: hw000,
    points: 1,
    frequency: {
      times: 1,
      days: 7,
    },
    frequencyType: EVERY_X_DAYS,
    categoryId: c002,
    description: '鏡を拭く',
    memberId: null,
  },
  [`${c002}-${hw001}`]: {
    id: hw001,
    points: 1,
    frequency: {
      times: 1,
      days: 7,
    },
    frequencyType: EVERY_X_DAYS,
    categoryId: c002,
    description: 'タオルを替える',
    memberId: null,
  },
  [`${c002}-${hw002}`]: {
    id: hw002,
    points: 3,
    frequency: {
      times: 1,
      days: 14,
    },
    frequencyType: EVERY_X_DAYS,
    categoryId: c002,
    description: '洗面台の掃除',
    memberId: null,
  },
  [`${c002}-${hw003}`]: {
    id: hw003,
    points: 3,
    frequency: ['Monday'],
    frequencyType: SPECIFIC_DAY_OF_WEEK,
    categoryId: c002,
    description: '排水溝の掃除',
    memberId: null,
  },
  [`${c002}-${hw004}`]: {
    id: hw004,
    points: 1,
    frequency: {
      times: 1,
      days: 2,
    },
    frequencyType: EVERY_X_DAYS,
    categoryId: c002,
    description: '洗面所の床掃除',
    memberId: null,
  },
  // お風呂場
  [`${c003}-${hw000}`]: {
    id: hw000,
    points: 3,
    frequency: TEMPORARY,
    frequencyType: TEMPORARY,
    categoryId: c003,
    description: '浴槽を洗う',
    memberId: null,
  },
  [`${c003}-${hw001}`]: {
    id: hw001,
    points: 2,
    frequency: TEMPORARY,
    frequencyType: TEMPORARY,
    categoryId: c003,
    description: 'フタを洗う',
    memberId: null,
  },
  [`${c003}-${hw002}`]: {
    id: hw002,
    points: 3,
    frequency: TEMPORARY,
    frequencyType: TEMPORARY,
    categoryId: c003,
    description: 'お風呂場の床を洗う',
    memberId: null,
  },
  [`${c003}-${hw003}`]: {
    id: hw003,
    points: 4,
    frequency: {
      times: 1,
      days: 30,
    },
    frequencyType: EVERY_X_DAYS,
    categoryId: c003,
    description: '排水溝のパーツを洗う',
    memberId: null,
  },
  [`${c003}-${hw004}`]: {
    id: hw004,
    points: 3,
    frequency: ['Monday', 'Thursday'],
    frequencyType: SPECIFIC_DAY_OF_WEEK,
    categoryId: c003,
    description: '髪の毛を取る',
    memberId: null,
  },
  [`${c003}-${hw005}`]: {
    id: hw005,
    points: 3,
    frequency: ['Monday', 'Thursday'],
    frequencyType: SPECIFIC_DAY_OF_WEEK,
    categoryId: c003,
    description: 'ネットを交換する',
    memberId: null,
  },
  [`${c003}-${hw006}`]: {
    id: hw006,
    points: 1,
    frequency: TEMPORARY,
    frequencyType: TEMPORARY,
    categoryId: c003,
    description: 'カビキラーする',
    memberId: null,
  },
  // トイレ
  [`${c004}-${hw000}`]: {
    id: hw000,
    points: 5,
    frequency: {
      times: 1,
      days: 7,
    },
    frequencyType: EVERY_X_DAYS,
    categoryId: c004,
    description: 'トイレを拭く',
    memberId: null,
  },
  [`${c004}-${hw001}`]: {
    id: hw001,
    points: 2,
    frequency: {
      times: 1,
      days: 2,
    },
    frequencyType: EVERY_X_DAYS,
    categoryId: c004,
    description: 'トイレの床掃除',
    memberId: null,
  },
  [`${c004}-${hw002}`]: {
    id: hw002,
    points: 1,
    frequency: TEMPORARY,
    frequencyType: TEMPORARY,
    categoryId: c004,
    description: 'トイレットペーパーの交換',
    memberId: null,
  },
  [`${c004}-${hw003}`]: {
    id: hw003,
    points: 1,
    frequency: TEMPORARY,
    frequencyType: TEMPORARY,
    categoryId: c004,
    description: 'トイレスタンプする',
    memberId: null,
  },
  [`${c004}-${hw004}`]: {
    id: hw004,
    points: 1,
    frequency: {
      times: 1,
      days: 7,
    },
    frequencyType: EVERY_X_DAYS,
    categoryId: c004,
    description: 'タオルを替える',
    memberId: null,
  },
  // キッチン
  [`${c005}-${hw000}`]: {
    id: hw000,
    points: 3,
    frequency: {
      times: 1,
      days: 1,
    },
    frequencyType: EVERY_X_DAYS,
    categoryId: c005,
    description: '洗い物',
    memberId: null,
  },
  [`${c005}-${hw001}`]: {
    id: hw001,
    points: 1,
    frequency: null,
    frequencyType: null,
    categoryId: c005,
    description: '食器を拭く',
    memberId: null,
  },
  [`${c005}-${hw002}`]: {
    id: hw002,
    points: 2,
    frequency: {
      times: 1,
      days: 1,
    },
    frequencyType: EVERY_X_DAYS,
    categoryId: c005,
    description: 'シンクの水気を拭く',
    memberId: null,
  },
  [`${c005}-${hw003}`]: {
    id: hw003,
    points: 1,
    frequency: {
      times: 1,
      days: 1,
    },
    frequencyType: EVERY_X_DAYS,
    categoryId: c005,
    description: '食器をしまう',
    memberId: null,
  },
  [`${c005}-${hw004}`]: {
    id: hw004,
    points: 1,
    frequency: TEMPORARY,
    frequencyType: TEMPORARY,
    categoryId: c005,
    description: '調味料の補充',
    memberId: null,
  },
  [`${c005}-${hw005}`]: {
    id: hw005,
    points: 1,
    frequency: {
      times: 1,
      days: 7,
    },
    frequencyType: EVERY_X_DAYS,
    categoryId: c005,
    description: 'キッチン壁の掃除',
    memberId: null,
  },
  [`${c005}-${hw006}`]: {
    id: hw006,
    points: 1,
    frequency: {
      times: 1,
      days: 1,
    },
    frequencyType: EVERY_X_DAYS,
    categoryId: c005,
    description: 'フライパン・調理器具などをしまう',
    memberId: null,
  },
  [`${c005}-${hw007}`]: {
    id: hw007,
    points: 2,
    frequency: {
      times: 1,
      days: 1,
    },
    frequencyType: EVERY_X_DAYS,
    categoryId: c005,
    description: 'IHの拭き掃除',
    memberId: null,
  },
  [`${c005}-${hw008}`]: {
    id: hw008,
    points: 1,
    frequency: {
      times: 1,
      days: 30,
    },
    frequencyType: EVERY_X_DAYS,
    categoryId: c005,
    description: '炊飯器の洗浄・掃除',
    memberId: null,
  },
  [`${c005}-${hw009}`]: {
    id: hw009,
    points: 1,
    frequency: {
      times: 1,
      days: 14,
    },
    frequencyType: EVERY_X_DAYS,
    categoryId: c005,
    description: '電子レンジの洗浄・掃除',
    memberId: null,
  },
  [`${c005}-${hw010}`]: {
    id: hw010,
    points: 1,
    frequency: {
      times: 1,
      days: 1,
    },
    frequencyType: EVERY_X_DAYS,
    categoryId: c005,
    description: 'コーヒーメーカーの掃除',
    memberId: null,
  },
  [`${c005}-${hw011}`]: {
    id: hw011,
    points: 3,
    frequency: ['Monday', 'Thursday'],
    frequencyType: SPECIFIC_DAY_OF_WEEK,
    categoryId: c005,
    description: 'ネットを交換する',
    memberId: null,
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
    frequencyType: SPECIFIC_DATE,
    categoryId: c005,
    description: 'レンジフードのフィルタを交換する',
    memberId: null,
  },
  [`${c005}-${hw013}`]: {
    id: hw013,
    points: 1,
    frequency: {
      times: 1,
      days: 7,
    },
    frequencyType: EVERY_X_DAYS,
    categoryId: c005,
    description: 'トレイ、牛乳パックをリサイクル',
    memberId: null,
  },
  // 料理
  [`${c006}-${hw000}`]: {
    id: hw000,
    points: 3,
    frequency: ['Saturday'],
    frequencyType: SPECIFIC_DAY_OF_WEEK,
    categoryId: c006,
    description: '買い出し',
    memberId: null,
  },
  [`${c006}-${hw001}`]: {
    id: hw001,
    points: 1,
    frequency: ['Saturday'],
    frequencyType: SPECIFIC_DAY_OF_WEEK,
    categoryId: c006,
    description: '買い物した荷物を運ぶ',
    memberId: null,
  },
  [`${c006}-${hw002}`]: {
    id: hw002,
    points: 1,
    frequency: ['Saturday'],
    frequencyType: SPECIFIC_DAY_OF_WEEK,
    categoryId: c006,
    description: '買い物した荷物を冷蔵庫へ入れる',
    memberId: null,
  },
  [`${c006}-${hw003}`]: {
    id: hw003,
    points: 3,
    frequency: {
      times: 1,
      days: 1,
    },
    frequencyType: EVERY_X_DAYS,
    categoryId: c006,
    description: '料理する',
    memberId: null,
  },
  [`${c006}-${hw004}`]: {
    id: hw004,
    points: 1,
    frequency: {
      times: 1,
      days: 1,
    },
    frequencyType: EVERY_X_DAYS,
    categoryId: c006,
    description: '配膳する',
    memberId: null,
  },
  [`${c006}-${hw005}`]: {
    id: hw005,
    points: 1,
    frequency: {
      times: 1,
      days: 1,
    },
    frequencyType: EVERY_X_DAYS,
    categoryId: c006,
    description: 'テーブルを拭く',
    memberId: null,
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
    frequencyType: SPECIFIC_DATE,
    categoryId: c006,
    description: '浄水器のフィルター交換',
    memberId: null,
  },
  [`${c006}-${hw007}`]: {
    id: hw007,
    points: 1,
    frequency: {
      times: 1,
      days: 30,
    },
    frequencyType: EVERY_X_DAYS,
    categoryId: c006,
    description: '食器用洗剤の補充',
    memberId: null,
  },
  [`${c006}-${hw008}`]: {
    id: hw008,
    points: 2,
    frequency: TEMPORARY,
    frequencyType: TEMPORARY,
    categoryId: c006,
    description: '包丁を研ぐ',
    memberId: null,
  },
  [`${c006}-${hw009}`]: {
    id: hw009,
    points: 1,
    frequency: {
      times: 1,
      days: 14,
    },
    frequencyType: EVERY_X_DAYS,
    categoryId: c006,
    description: 'ランチョンマットを洗う',
    memberId: null,
  },
  // 掃除
  [`${c007}-${hw000}`]: {
    id: hw000,
    points: 2,
    frequency: {
      times: 1,
      days: 2,
    },
    frequencyType: EVERY_X_DAYS,
    categoryId: c007,
    description: 'リビングの床掃除',
    memberId: null,
  },
  [`${c007}-${hw001}`]: {
    id: hw001,
    points: 1,
    frequency: {
      times: 1,
      days: 2,
    },
    frequencyType: EVERY_X_DAYS,
    categoryId: c007,
    description: 'ベッドルームの床掃除',
    memberId: null,
  },
  [`${c007}-${hw002}`]: {
    id: hw002,
    points: 1,
    frequency: {
      times: 1,
      days: 2,
    },
    frequencyType: EVERY_X_DAYS,
    categoryId: c007,
    description: 'カーペットのコロコロ',
    memberId: null,
  },
  [`${c007}-${hw003}`]: {
    id: hw003,
    points: 1,
    frequency: {
      times: 1,
      days: 14,
    },
    frequencyType: EVERY_X_DAYS,
    categoryId: c007,
    description: 'カーペットの洗濯・乾燥',
    memberId: null,
  },
  [`${c007}-${hw004}`]: {
    id: hw004,
    points: 1,
    frequency: {
      times: 1,
      days: 7,
    },
    frequencyType: EVERY_X_DAYS,
    categoryId: c007,
    description: 'ホコリ落とし',
    memberId: null,
  },
  // 季節ごと
  [`${c008}-${hw000}`]: {
    id: hw000,
    points: 3,
    frequency: TEMPORARY,
    frequencyType: TEMPORARY,
    categoryId: c008,
    description: '除／加湿器の洗浄',
    memberId: null,
  },
  [`${c008}-${hw001}`]: {
    id: hw001,
    points: 5,
    frequency: TEMPORARY,
    frequencyType: TEMPORARY,
    categoryId: c008,
    description: 'エアコンの掃除',
    memberId: null,
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
    frequencyType: SPECIFIC_DATE,
    categoryId: c008,
    description: '防虫剤の交換',
    memberId: null,
  },
  // 猫ちゃん
  [`${c009}-${hw000}`]: {
    id: hw000,
    points: 1,
    frequency: {
      times: 3,
      days: 1,
    },
    frequencyType: EVERY_X_DAYS,
    categoryId: c009,
    description: 'えさやり',
    memberId: null,
  },
  [`${c009}-${hw001}`]: {
    id: hw001,
    points: 1,
    frequency: {
      times: 3,
      days: 1,
    },
    frequencyType: EVERY_X_DAYS,
    categoryId: c009,
    description: 'えさ皿を洗う',
    memberId: null,
  },
  [`${c009}-${hw002}`]: {
    id: hw002,
    points: 1,
    frequency: {
      times: 1,
      days: 3,
    },
    frequencyType: EVERY_X_DAYS,
    categoryId: c009,
    description: 'えさ補充',
    memberId: null,
  },
  [`${c009}-${hw003}`]: {
    id: hw003,
    points: 3,
    frequency: {
      times: 1,
      days: 2,
    },
    frequencyType: EVERY_X_DAYS,
    categoryId: c009,
    description: '水替え',
    memberId: null,
  },
  [`${c009}-${hw004}`]: {
    id: hw004,
    points: 1,
    frequency: {
      times: 1,
      days: 1,
    },
    frequencyType: EVERY_X_DAYS,
    categoryId: c009,
    description: 'ブラッシング',
    memberId: null,
  },
  [`${c009}-${hw005}`]: {
    id: hw005,
    points: 1,
    frequency: {
      times: 1,
      days: 1,
    },
    frequencyType: EVERY_X_DAYS,
    categoryId: c009,
    description: 'うんち取る',
    memberId: null,
  },
  [`${c009}-${hw006}`]: {
    id: hw006,
    points: 1,
    frequency: {
      times: 1,
      days: 7,
    },
    frequencyType: EVERY_X_DAYS,
    categoryId: c009,
    description: '猫砂の補充',
    memberId: null,
  },
  [`${c009}-${hw007}`]: {
    id: hw007,
    points: 2,
    frequency: ['Thursday'],
    frequencyType: SPECIFIC_DAY_OF_WEEK,
    categoryId: c009,
    description: 'おしっこシートを替える',
    memberId: null,
  },
  [`${c009}-${hw008}`]: {
    id: hw008,
    points: 1,
    frequency: {
      times: 1,
      days: 3,
    },
    frequencyType: EVERY_X_DAYS,
    categoryId: c009,
    description: '涙拭く',
    memberId: null,
  },
  [`${c009}-${hw009}`]: {
    id: hw009,
    points: 2,
    frequency: {
      times: 1,
      days: 14,
    },
    frequencyType: EVERY_X_DAYS,
    categoryId: c009,
    description: '手の爪切り',
    memberId: null,
  },
  [`${c009}-${hw010}`]: {
    id: hw010,
    points: 2,
    frequency: {
      times: 1,
      days: 30,
    },
    frequencyType: EVERY_X_DAYS,
    categoryId: c009,
    description: '足の爪切り',
    memberId: null,
  },
  [`${c009}-${hw011}`]: {
    id: hw011,
    points: 4,
    frequency: {
      times: 1,
      days: 30,
    },
    frequencyType: EVERY_X_DAYS,
    categoryId: c009,
    description: 'トイレを洗う',
    memberId: null,
  },
  // ごみ
  [`${c010}-${hw000}`]: {
    id: hw000,
    points: 2,
    frequency: ['Monday', 'Thursday'],
    frequencyType: SPECIFIC_DAY_OF_WEEK,
    categoryId: c010,
    description: '可燃ごみ',
    memberId: null,
  },
  [`${c010}-${hw001}`]: {
    id: hw001,
    points: 1,
    frequency: ['Sunday'],
    frequencyType: SPECIFIC_DAY_OF_WEEK,
    categoryId: c010,
    description: 'プラスチック',
    memberId: null,
  },
  [`${c010}-${hw002}`]: {
    id: hw002,
    points: 1,
    frequency: ['Sunday'],
    frequencyType: SPECIFIC_DAY_OF_WEEK,
    categoryId: c010,
    description: '缶・ビン',
    memberId: null,
  },
  [`${c010}-${hw003}`]: {
    id: hw003,
    points: 1,
    frequency: ['Friday'],
    frequencyType: SPECIFIC_DAY_OF_WEEK,
    categoryId: c010,
    description: 'ペットボトル',
    memberId: null,
  },
  [`${c010}-${hw004}`]: {
    id: hw004,
    points: 1,
    frequency: ['Friday'],
    frequencyType: SPECIFIC_DAY_OF_WEEK,
    categoryId: c010,
    description: '段ボール',
    memberId: null,
  },
  [`${c010}-${hw005}`]: {
    id: hw005,
    points: 1,
    frequency: TEMPORARY,
    frequencyType: TEMPORARY,
    categoryId: c010,
    description: '不燃ごみ',
    memberId: null,
  },
  [`${c010}-${hw006}`]: {
    id: hw006,
    points: 1,
    frequency: TEMPORARY,
    frequencyType: TEMPORARY,
    categoryId: c010,
    description: '粗大ごみ',
    memberId: null,
  },
  [`${c010}-${hw007}`]: {
    id: hw007,
    points: 1,
    frequency: TEMPORARY,
    frequencyType: TEMPORARY,
    categoryId: c010,
    description: '粗大ごみを申し込む',
    memberId: null,
  },
  [`${c010}-${hw008}`]: {
    id: hw008,
    points: 1,
    frequency: TEMPORARY,
    frequencyType: TEMPORARY,
    categoryId: c010,
    description: '粗大ごみ券を買う',
    memberId: null,
  },
  [`${c010}-${hw009}`]: {
    id: hw009,
    points: 2,
    frequency: TEMPORARY,
    frequencyType: TEMPORARY,
    categoryId: c010,
    description: 'ごみ箱を洗う',
    memberId: null,
  },
  [`${c010}-${hw010}`]: {
    id: hw010,
    points: 1,
    frequency: ['Sunday', 'Monday', 'Thursday'],
    frequencyType: SPECIFIC_DAY_OF_WEEK,
    categoryId: c010,
    description: 'ごみ袋を装着する',
    memberId: null,
  },
}
