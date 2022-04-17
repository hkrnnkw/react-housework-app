import { FREQUENCY_ENUM } from './constant'
import { Category, House } from './type'

const { TEMPORARY, TIMES_PER_DAYS, DAYS_OF_WEEK, SPECIFIC_DATES } =
  FREQUENCY_ENUM

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
} as const

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
  [c000]: {
    [hw000]: {
      points: 3,
      frequency: {
        key: TEMPORARY,
        values: {
          temporary: null,
        },
      },
      title: 'その他',
      memberId: null,
    },
    [hw001]: {
      points: 1,
      frequency: {
        key: TEMPORARY,
        values: {
          temporary: null,
        },
      },
      title: '郵便物を取りに行く',
      memberId: null,
    },
    [hw002]: {
      points: 1,
      frequency: {
        key: TEMPORARY,
        values: {
          temporary: null,
        },
      },
      title: '郵便物を分けて捨てる',
      memberId: null,
    },
    [hw003]: {
      points: 1,
      frequency: {
        key: TIMES_PER_DAYS,
        values: {
          temporary: null,
          timesPerDays: {
            times: 1,
            days: 14,
          },
        },
      },
      title: '植物への水やり',
      memberId: null,
    },
    [hw004]: {
      points: 1,
      frequency: {
        key: TIMES_PER_DAYS,
        values: {
          temporary: null,
          timesPerDays: {
            times: 1,
            days: 1,
          },
        },
      },
      title: '除／加湿器のタンク替え',
      memberId: null,
    },
    [hw005]: {
      points: 1,
      frequency: {
        key: TEMPORARY,
        values: {
          temporary: null,
        },
      },
      title: 'ティッシュペーパーの補充',
      memberId: null,
    },
    [hw006]: {
      points: 1,
      frequency: {
        key: TEMPORARY,
        values: {
          temporary: null,
        },
      },
      title: 'ウェットティッシュの補充',
      memberId: null,
    },
    [hw007]: {
      points: 1,
      frequency: {
        key: TEMPORARY,
        values: {
          temporary: null,
        },
      },
      title: 'コロコロの補充',
      memberId: null,
    },
  },
  // 洗濯
  [c001]: {
    [hw000]: {
      points: 1,
      frequency: {
        key: TIMES_PER_DAYS,
        values: {
          temporary: null,
          timesPerDays: {
            times: 1,
            days: 3,
          },
        },
      },
      title: '洗濯機を回す',
      memberId: null,
    },
    [hw001]: {
      points: 2,
      frequency: {
        key: TIMES_PER_DAYS,
        values: {
          temporary: null,
          timesPerDays: {
            times: 1,
            days: 3,
          },
        },
      },
      title: '洗濯物を干す',
      memberId: null,
    },
    [hw002]: {
      points: 1,
      frequency: {
        key: TIMES_PER_DAYS,
        values: {
          temporary: null,
          timesPerDays: {
            times: 1,
            days: 3,
          },
        },
      },
      title: '洗濯物を取り込む',
      memberId: null,
    },
    [hw003]: {
      points: 2,
      frequency: {
        key: TIMES_PER_DAYS,
        values: {
          temporary: null,
          timesPerDays: {
            times: 1,
            days: 3,
          },
        },
      },
      title: '洗濯物を畳む',
      memberId: null,
    },
    [hw004]: {
      points: 1,
      frequency: {
        key: TIMES_PER_DAYS,
        values: {
          temporary: null,
          timesPerDays: {
            times: 1,
            days: 3,
          },
        },
      },
      title: '洗濯物をしまう',
      memberId: null,
    },
    [hw005]: {
      points: 3,
      frequency: {
        key: SPECIFIC_DATES,
        values: {
          temporary: null,
          specificDates: [{ mm: 1, dd: 3 }],
        },
      },
      title: '洗濯機のフィルタのホコリを取る',
      memberId: null,
    },
    [hw006]: {
      points: 1,
      frequency: {
        key: TEMPORARY,
        values: {
          temporary: null,
        },
      },
      title: '洗濯洗剤を詰め替える',
      memberId: null,
    },
    [hw007]: {
      points: 1,
      frequency: {
        key: TEMPORARY,
        values: {
          temporary: null,
        },
      },
      title: '柔軟剤を詰め替える',
      memberId: null,
    },
  },
  // 洗面所
  [c002]: {
    [hw000]: {
      points: 1,
      frequency: {
        key: TIMES_PER_DAYS,
        values: {
          temporary: null,
          timesPerDays: {
            times: 1,
            days: 7,
          },
        },
      },
      title: '鏡を拭く',
      memberId: null,
    },
    [hw001]: {
      points: 1,
      frequency: {
        key: TIMES_PER_DAYS,
        values: {
          temporary: null,
          timesPerDays: {
            times: 1,
            days: 7,
          },
        },
      },
      title: 'タオルを替える',
      memberId: null,
    },
    [hw002]: {
      points: 3,
      frequency: {
        key: TIMES_PER_DAYS,
        values: {
          temporary: null,
          timesPerDays: {
            times: 1,
            days: 14,
          },
        },
      },
      title: '洗面台の掃除',
      memberId: null,
    },
    [hw003]: {
      points: 3,
      frequency: {
        key: DAYS_OF_WEEK,
        values: {
          temporary: null,
          daysOfWeek: ['Monday'],
        },
      },
      title: '排水溝の掃除',
      memberId: null,
    },
    [hw004]: {
      points: 1,
      frequency: {
        key: TIMES_PER_DAYS,
        values: {
          temporary: null,
          timesPerDays: {
            times: 1,
            days: 2,
          },
        },
      },
      title: '洗面所の床掃除',
      memberId: null,
    },
  },
  // お風呂場
  [c003]: {
    [hw000]: {
      points: 3,
      frequency: {
        key: TEMPORARY,
        values: {
          temporary: null,
        },
      },
      title: '浴槽を洗う',
      memberId: null,
    },
    [hw001]: {
      points: 2,
      frequency: {
        key: TEMPORARY,
        values: {
          temporary: null,
        },
      },
      title: 'フタを洗う',
      memberId: null,
    },
    [hw002]: {
      points: 3,
      frequency: {
        key: TEMPORARY,
        values: {
          temporary: null,
        },
      },
      title: 'お風呂場の床を洗う',
      memberId: null,
    },
    [hw003]: {
      points: 4,
      frequency: {
        key: TIMES_PER_DAYS,
        values: {
          temporary: null,
          timesPerDays: {
            times: 1,
            days: 30,
          },
        },
      },
      title: '排水溝のパーツを洗う',
      memberId: null,
    },
    [hw004]: {
      points: 3,
      frequency: {
        key: DAYS_OF_WEEK,
        values: {
          temporary: null,
          daysOfWeek: ['Monday', 'Thursday'],
        },
      },
      title: '髪の毛を取る',
      memberId: null,
    },
    [hw005]: {
      points: 3,
      frequency: {
        key: DAYS_OF_WEEK,
        values: {
          temporary: null,
          daysOfWeek: ['Monday', 'Thursday'],
        },
      },
      title: 'ネットを交換する',
      memberId: null,
    },
    [hw006]: {
      points: 1,
      frequency: {
        key: TEMPORARY,
        values: {
          temporary: null,
        },
      },
      title: 'カビキラーする',
      memberId: null,
    },
  },
  // トイレ
  [c004]: {
    [hw000]: {
      points: 5,
      frequency: {
        key: TIMES_PER_DAYS,
        values: {
          temporary: null,
          timesPerDays: {
            times: 1,
            days: 7,
          },
        },
      },
      title: 'トイレを拭く',
      memberId: null,
    },
    [hw001]: {
      points: 2,
      frequency: {
        key: TIMES_PER_DAYS,
        values: {
          temporary: null,
          timesPerDays: {
            times: 1,
            days: 2,
          },
        },
      },
      title: 'トイレの床掃除',
      memberId: null,
    },
    [hw002]: {
      points: 1,
      frequency: {
        key: TEMPORARY,
        values: {
          temporary: null,
        },
      },
      title: 'トイレットペーパーの交換',
      memberId: null,
    },
    [hw003]: {
      points: 1,
      frequency: {
        key: TEMPORARY,
        values: {
          temporary: null,
        },
      },
      title: 'トイレスタンプする',
      memberId: null,
    },
    [hw004]: {
      points: 1,
      frequency: {
        key: TIMES_PER_DAYS,
        values: {
          temporary: null,
          timesPerDays: {
            times: 1,
            days: 7,
          },
        },
      },
      title: 'タオルを替える',
      memberId: null,
    },
  },
  // キッチン
  [c005]: {
    [hw000]: {
      points: 3,
      frequency: {
        key: TIMES_PER_DAYS,
        values: {
          temporary: null,
          timesPerDays: {
            times: 1,
            days: 1,
          },
        },
      },
      title: '洗い物',
      memberId: null,
    },
    [hw001]: {
      points: 1,
      frequency: {
        key: TEMPORARY,
        values: {
          temporary: null,
        },
      },
      title: '食器を拭く',
      memberId: null,
    },
    [hw002]: {
      points: 2,
      frequency: {
        key: TIMES_PER_DAYS,
        values: {
          temporary: null,
          timesPerDays: {
            times: 1,
            days: 1,
          },
        },
      },
      title: 'シンクの水気を拭く',
      memberId: null,
    },
    [hw003]: {
      points: 1,
      frequency: {
        key: TIMES_PER_DAYS,
        values: {
          temporary: null,
          timesPerDays: {
            times: 1,
            days: 1,
          },
        },
      },
      title: '食器をしまう',
      memberId: null,
    },
    [hw004]: {
      points: 1,
      frequency: {
        key: TEMPORARY,
        values: {
          temporary: null,
        },
      },
      title: '調味料の補充',
      memberId: null,
    },
    [hw005]: {
      points: 1,
      frequency: {
        key: TIMES_PER_DAYS,
        values: {
          temporary: null,
          timesPerDays: {
            times: 1,
            days: 7,
          },
        },
      },
      title: 'キッチン壁の掃除',
      memberId: null,
    },
    [hw006]: {
      points: 1,
      frequency: {
        key: TIMES_PER_DAYS,
        values: {
          temporary: null,
          timesPerDays: {
            times: 1,
            days: 1,
          },
        },
      },
      title: 'フライパン・調理器具などをしまう',
      memberId: null,
    },
    [hw007]: {
      points: 2,
      frequency: {
        key: TIMES_PER_DAYS,
        values: {
          temporary: null,
          timesPerDays: {
            times: 1,
            days: 1,
          },
        },
      },
      title: 'IHの拭き掃除',
      memberId: null,
    },
    [hw008]: {
      points: 1,
      frequency: {
        key: TIMES_PER_DAYS,
        values: {
          temporary: null,
          timesPerDays: {
            times: 1,
            days: 30,
          },
        },
      },
      title: '炊飯器の洗浄・掃除',
      memberId: null,
    },
    [hw009]: {
      points: 1,
      frequency: {
        key: TIMES_PER_DAYS,
        values: {
          temporary: null,
          timesPerDays: {
            times: 1,
            days: 14,
          },
        },
      },
      title: '電子レンジの洗浄・掃除',
      memberId: null,
    },
    [hw010]: {
      points: 1,
      frequency: {
        key: TIMES_PER_DAYS,
        values: {
          temporary: null,
          timesPerDays: {
            times: 1,
            days: 1,
          },
        },
      },
      title: 'コーヒーメーカーの掃除',
      memberId: null,
    },
    [hw011]: {
      points: 3,
      frequency: {
        key: DAYS_OF_WEEK,
        values: {
          temporary: null,
          daysOfWeek: ['Monday', 'Thursday'],
        },
      },
      title: 'ネットを交換する',
      memberId: null,
    },
    [hw012]: {
      points: 2,
      frequency: {
        key: SPECIFIC_DATES,
        values: {
          temporary: null,
          specificDates: [
            { mm: 5, dd: 1 },
            { mm: 11, dd: 1 },
          ],
        },
      },
      title: 'レンジフードのフィルタを交換する',
      memberId: null,
    },
    [hw013]: {
      points: 1,
      frequency: {
        key: TIMES_PER_DAYS,
        values: {
          temporary: null,
          timesPerDays: {
            times: 1,
            days: 7,
          },
        },
      },
      title: 'トレイ、牛乳パックをリサイクル',
      memberId: null,
    },
  },
  // 料理
  [c006]: {
    [hw000]: {
      points: 3,
      frequency: {
        key: DAYS_OF_WEEK,
        values: {
          temporary: null,
          daysOfWeek: ['Saturday'],
        },
      },
      title: '買い出し',
      memberId: null,
    },
    [hw001]: {
      points: 1,
      frequency: {
        key: DAYS_OF_WEEK,
        values: {
          temporary: null,
          daysOfWeek: ['Saturday'],
        },
      },
      title: '買い物した荷物を運ぶ',
      memberId: null,
    },
    [hw002]: {
      points: 1,
      frequency: {
        key: DAYS_OF_WEEK,
        values: {
          temporary: null,
          daysOfWeek: ['Saturday'],
        },
      },
      title: '買い物した荷物を冷蔵庫へ入れる',
      memberId: null,
    },
    [hw003]: {
      points: 3,
      frequency: {
        key: TIMES_PER_DAYS,
        values: {
          temporary: null,
          timesPerDays: {
            times: 1,
            days: 1,
          },
        },
      },
      title: '料理する',
      memberId: null,
    },
    [hw004]: {
      points: 1,
      frequency: {
        key: TIMES_PER_DAYS,
        values: {
          temporary: null,
          timesPerDays: {
            times: 1,
            days: 1,
          },
        },
      },
      title: '配膳する',
      memberId: null,
    },
    [hw005]: {
      points: 1,
      frequency: {
        key: TIMES_PER_DAYS,
        values: {
          temporary: null,
          timesPerDays: {
            times: 1,
            days: 1,
          },
        },
      },
      title: 'テーブルを拭く',
      memberId: null,
    },
    [hw006]: {
      points: 3,
      frequency: {
        key: SPECIFIC_DATES,
        values: {
          temporary: null,
          specificDates: [
            { mm: 1, dd: 31 },
            { mm: 4, dd: 30 },
            { mm: 7, dd: 31 },
            { mm: 10, dd: 31 },
          ],
        },
      },
      title: '浄水器のフィルター交換',
      memberId: null,
    },
    [hw007]: {
      points: 1,
      frequency: {
        key: TIMES_PER_DAYS,
        values: {
          temporary: null,
          timesPerDays: {
            times: 1,
            days: 30,
          },
        },
      },
      title: '食器用洗剤の補充',
      memberId: null,
    },
    [hw008]: {
      points: 2,
      frequency: {
        key: TEMPORARY,
        values: {
          temporary: null,
        },
      },
      title: '包丁を研ぐ',
      memberId: null,
    },
    [hw009]: {
      points: 1,
      frequency: {
        key: TIMES_PER_DAYS,
        values: {
          temporary: null,
          timesPerDays: {
            times: 1,
            days: 14,
          },
        },
      },
      title: 'ランチョンマットを洗う',
      memberId: null,
    },
  },
  // 掃除
  [c007]: {
    [hw000]: {
      points: 2,
      frequency: {
        key: TIMES_PER_DAYS,
        values: {
          temporary: null,
          timesPerDays: {
            times: 1,
            days: 2,
          },
        },
      },
      title: 'リビングの床掃除',
      memberId: null,
    },
    [hw001]: {
      points: 1,
      frequency: {
        key: TIMES_PER_DAYS,
        values: {
          temporary: null,
          timesPerDays: {
            times: 1,
            days: 2,
          },
        },
      },
      title: 'ベッドルームの床掃除',
      memberId: null,
    },
    [hw002]: {
      points: 1,
      frequency: {
        key: TIMES_PER_DAYS,
        values: {
          temporary: null,
          timesPerDays: {
            times: 1,
            days: 2,
          },
        },
      },
      title: 'カーペットのコロコロ',
      memberId: null,
    },
    [hw003]: {
      points: 1,
      frequency: {
        key: TIMES_PER_DAYS,
        values: {
          temporary: null,
          timesPerDays: {
            times: 1,
            days: 14,
          },
        },
      },
      title: 'カーペットの洗濯・乾燥',
      memberId: null,
    },
    [hw004]: {
      points: 1,
      frequency: {
        key: TIMES_PER_DAYS,
        values: {
          temporary: null,
          timesPerDays: {
            times: 1,
            days: 7,
          },
        },
      },
      title: 'ホコリ落とし',
      memberId: null,
    },
  },
  // 季節ごと
  [c008]: {
    [hw000]: {
      points: 3,
      frequency: {
        key: TEMPORARY,
        values: {
          temporary: null,
        },
      },
      title: '除／加湿器の洗浄',
      memberId: null,
    },
    [hw001]: {
      points: 5,
      frequency: {
        key: TEMPORARY,
        values: {
          temporary: null,
        },
      },
      title: 'エアコンの掃除',
      memberId: null,
    },
    [hw002]: {
      points: 5,
      frequency: {
        key: SPECIFIC_DATES,
        values: {
          temporary: null,
          specificDates: [
            { mm: 2, dd: 1 },
            { mm: 8, dd: 1 },
          ],
        },
      },
      title: '防虫剤の交換',
      memberId: null,
    },
  },
  // 猫ちゃん
  [c009]: {
    [hw000]: {
      points: 1,
      frequency: {
        key: TIMES_PER_DAYS,
        values: {
          temporary: null,
          timesPerDays: {
            times: 2,
            days: 1,
          },
        },
      },
      title: 'えさやり',
      memberId: null,
    },
    [hw001]: {
      points: 1,
      frequency: {
        key: TIMES_PER_DAYS,
        values: {
          temporary: null,
          timesPerDays: {
            times: 2,
            days: 1,
          },
        },
      },
      title: 'えさ皿を洗う',
      memberId: null,
    },
    [hw002]: {
      points: 1,
      frequency: {
        key: TEMPORARY,
        values: {
          temporary: null,
        },
      },
      title: 'えさ補充',
      memberId: null,
    },
    [hw003]: {
      points: 3,
      frequency: {
        key: TIMES_PER_DAYS,
        values: {
          temporary: null,
          timesPerDays: {
            times: 1,
            days: 2,
          },
        },
      },
      title: '水替え',
      memberId: null,
    },
    [hw004]: {
      points: 1,
      frequency: {
        key: TIMES_PER_DAYS,
        values: {
          temporary: null,
          timesPerDays: {
            times: 1,
            days: 1,
          },
        },
      },
      title: 'ブラッシング',
      memberId: null,
    },
    [hw005]: {
      points: 1,
      frequency: {
        key: TIMES_PER_DAYS,
        values: {
          temporary: null,
          timesPerDays: {
            times: 1,
            days: 1,
          },
        },
      },
      title: 'うんち取る',
      memberId: null,
    },
    [hw006]: {
      points: 1,
      frequency: {
        key: TIMES_PER_DAYS,
        values: {
          temporary: null,
          timesPerDays: {
            times: 1,
            days: 7,
          },
        },
      },
      title: '猫砂の補充',
      memberId: null,
    },
    [hw007]: {
      points: 2,
      frequency: {
        key: DAYS_OF_WEEK,
        values: {
          temporary: null,
          daysOfWeek: ['Thursday'],
        },
      },
      title: 'おしっこシートを替える',
      memberId: null,
    },
    [hw008]: {
      points: 1,
      frequency: {
        key: TIMES_PER_DAYS,
        values: {
          temporary: null,
          timesPerDays: {
            times: 1,
            days: 3,
          },
        },
      },
      title: '涙拭く',
      memberId: null,
    },
    [hw009]: {
      points: 2,
      frequency: {
        key: TIMES_PER_DAYS,
        values: {
          temporary: null,
          timesPerDays: {
            times: 1,
            days: 14,
          },
        },
      },
      title: '手の爪切り',
      memberId: null,
    },
    [hw010]: {
      points: 2,
      frequency: {
        key: TIMES_PER_DAYS,
        values: {
          temporary: null,
          timesPerDays: {
            times: 1,
            days: 30,
          },
        },
      },
      title: '足の爪切り',
      memberId: null,
    },
    [hw011]: {
      points: 4,
      frequency: {
        key: TIMES_PER_DAYS,
        values: {
          temporary: null,
          timesPerDays: {
            times: 1,
            days: 30,
          },
        },
      },
      title: 'トイレを洗う',
      memberId: null,
    },
  },
  // ごみ
  [c010]: {
    [hw000]: {
      points: 2,
      frequency: {
        key: DAYS_OF_WEEK,
        values: {
          temporary: null,
          daysOfWeek: ['Monday', 'Thursday'],
        },
      },
      title: '可燃ごみ',
      memberId: null,
    },
    [hw001]: {
      points: 1,
      frequency: {
        key: DAYS_OF_WEEK,
        values: {
          temporary: null,
          daysOfWeek: ['Sunday'],
        },
      },
      title: 'プラスチック',
      memberId: null,
    },
    [hw002]: {
      points: 1,
      frequency: {
        key: DAYS_OF_WEEK,
        values: {
          temporary: null,
          daysOfWeek: ['Sunday'],
        },
      },
      title: '缶・ビン',
      memberId: null,
    },
    [hw003]: {
      points: 1,
      frequency: {
        key: DAYS_OF_WEEK,
        values: {
          temporary: null,
          daysOfWeek: ['Friday'],
        },
      },
      title: 'ペットボトル',
      memberId: null,
    },
    [hw004]: {
      points: 1,
      frequency: {
        key: DAYS_OF_WEEK,
        values: {
          temporary: null,
          daysOfWeek: ['Friday'],
        },
      },
      title: '段ボール',
      memberId: null,
    },
    [hw005]: {
      points: 1,
      frequency: {
        key: TEMPORARY,
        values: {
          temporary: null,
        },
      },
      title: '不燃ごみ',
      memberId: null,
    },
    [hw006]: {
      points: 1,
      frequency: {
        key: TEMPORARY,
        values: {
          temporary: null,
        },
      },
      title: '粗大ごみ',
      memberId: null,
    },
    [hw007]: {
      points: 1,
      frequency: {
        key: TEMPORARY,
        values: {
          temporary: null,
        },
      },
      title: '粗大ごみを申し込む',
      memberId: null,
    },
    [hw008]: {
      points: 1,
      frequency: {
        key: TEMPORARY,
        values: {
          temporary: null,
        },
      },
      title: '粗大ごみ券を買う',
      memberId: null,
    },
    [hw009]: {
      points: 2,
      frequency: {
        key: TEMPORARY,
        values: {
          temporary: null,
        },
      },
      title: 'ごみ箱を洗う',
      memberId: null,
    },
    [hw010]: {
      points: 1,
      frequency: {
        key: DAYS_OF_WEEK,
        values: {
          temporary: null,
          daysOfWeek: ['Sunday', 'Monday', 'Thursday'],
        },
      },
      title: 'ごみ袋を装着する',
      memberId: null,
    },
  },
}
