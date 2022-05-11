import { FREQUENCY_ENUM } from './constant'
import { House, HouseworkDetail } from './type'

const { TEMPORARY, TIMES_PER_DAYS, DAYS_OF_WEEK, SPECIFIC_DATES } =
  FREQUENCY_ENUM

export const initialHousework: HouseworkDetail = {
  title: '',
  description: undefined,
  memberId: null,
  point: 1,
  frequency: {
    key: TEMPORARY,
    values: { temporary: null },
  },
} as const

const defaultHousework: House['housework'] = {
  // その他
  c000: {
    category: 'その他',
    taskDetails: {
      hw000: {
        point: 3,
        frequency: {
          key: TEMPORARY,
          values: {
            temporary: null,
          },
        },
        title: 'その他',
        memberId: null,
      },
      hw001: {
        point: 1,
        frequency: {
          key: TEMPORARY,
          values: {
            temporary: null,
          },
        },
        title: '郵便物を取りに行く',
        memberId: null,
      },
      hw002: {
        point: 1,
        frequency: {
          key: TEMPORARY,
          values: {
            temporary: null,
          },
        },
        title: '郵便物を分けて捨てる',
        memberId: null,
      },
      hw003: {
        point: 1,
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
      hw004: {
        point: 1,
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
      hw005: {
        point: 1,
        frequency: {
          key: TEMPORARY,
          values: {
            temporary: null,
          },
        },
        title: 'ティッシュペーパーの補充',
        memberId: null,
      },
      hw006: {
        point: 1,
        frequency: {
          key: TEMPORARY,
          values: {
            temporary: null,
          },
        },
        title: 'ウェットティッシュの補充',
        memberId: null,
      },
      hw007: {
        point: 1,
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
  },
  // 洗濯
  c001: {
    category: '洗濯',
    taskDetails: {
      hw000: {
        point: 1,
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
      hw001: {
        point: 2,
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
      hw002: {
        point: 1,
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
      hw003: {
        point: 2,
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
      hw004: {
        point: 1,
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
      hw005: {
        point: 3,
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
      hw006: {
        point: 1,
        frequency: {
          key: TEMPORARY,
          values: {
            temporary: null,
          },
        },
        title: '洗濯洗剤を詰め替える',
        memberId: null,
      },
      hw007: {
        point: 1,
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
  },
  // 洗面所
  c002: {
    category: '洗面所',
    taskDetails: {
      hw000: {
        point: 1,
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
      hw001: {
        point: 1,
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
      hw002: {
        point: 3,
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
      hw003: {
        point: 3,
        frequency: {
          key: DAYS_OF_WEEK,
          values: {
            temporary: null,
            daysOfWeek: [1],
          },
        },
        title: '排水溝の掃除',
        memberId: null,
      },
      hw004: {
        point: 1,
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
  },
  // お風呂場
  c003: {
    category: 'お風呂場',
    taskDetails: {
      hw000: {
        point: 3,
        frequency: {
          key: TEMPORARY,
          values: {
            temporary: null,
          },
        },
        title: '浴槽を洗う',
        memberId: null,
      },
      hw001: {
        point: 2,
        frequency: {
          key: TEMPORARY,
          values: {
            temporary: null,
          },
        },
        title: 'フタを洗う',
        memberId: null,
      },
      hw002: {
        point: 3,
        frequency: {
          key: TEMPORARY,
          values: {
            temporary: null,
          },
        },
        title: 'お風呂場の床を洗う',
        memberId: null,
      },
      hw003: {
        point: 4,
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
      hw004: {
        point: 3,
        frequency: {
          key: DAYS_OF_WEEK,
          values: {
            temporary: null,
            daysOfWeek: [1, 4],
          },
        },
        title: '髪の毛を取る',
        memberId: null,
      },
      hw005: {
        point: 3,
        frequency: {
          key: DAYS_OF_WEEK,
          values: {
            temporary: null,
            daysOfWeek: [1, 4],
          },
        },
        title: 'ネットを交換する',
        memberId: null,
      },
      hw006: {
        point: 1,
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
  },
  // トイレ
  c004: {
    category: 'トイレ',
    taskDetails: {
      hw000: {
        point: 5,
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
      hw001: {
        point: 2,
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
      hw002: {
        point: 1,
        frequency: {
          key: TEMPORARY,
          values: {
            temporary: null,
          },
        },
        title: 'トイレットペーパーの交換',
        memberId: null,
      },
      hw003: {
        point: 1,
        frequency: {
          key: TEMPORARY,
          values: {
            temporary: null,
          },
        },
        title: 'トイレスタンプする',
        memberId: null,
      },
      hw004: {
        point: 1,
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
  },
  // キッチン
  c005: {
    category: 'キッチン',
    taskDetails: {
      hw000: {
        point: 3,
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
      hw001: {
        point: 1,
        frequency: {
          key: TEMPORARY,
          values: {
            temporary: null,
          },
        },
        title: '食器を拭く',
        memberId: null,
      },
      hw002: {
        point: 2,
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
      hw003: {
        point: 1,
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
      hw004: {
        point: 1,
        frequency: {
          key: TEMPORARY,
          values: {
            temporary: null,
          },
        },
        title: '調味料の補充',
        memberId: null,
      },
      hw005: {
        point: 1,
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
      hw006: {
        point: 1,
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
      hw007: {
        point: 2,
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
      hw008: {
        point: 1,
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
      hw009: {
        point: 1,
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
      hw010: {
        point: 1,
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
      hw011: {
        point: 3,
        frequency: {
          key: DAYS_OF_WEEK,
          values: {
            temporary: null,
            daysOfWeek: [1, 4],
          },
        },
        title: 'ネットを交換する',
        memberId: null,
      },
      hw012: {
        point: 2,
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
      hw013: {
        point: 1,
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
  },
  // 料理
  c006: {
    category: '料理',
    taskDetails: {
      hw000: {
        point: 3,
        frequency: {
          key: DAYS_OF_WEEK,
          values: {
            temporary: null,
            daysOfWeek: [6],
          },
        },
        title: '買い出し',
        memberId: null,
      },
      hw001: {
        point: 1,
        frequency: {
          key: DAYS_OF_WEEK,
          values: {
            temporary: null,
            daysOfWeek: [6],
          },
        },
        title: '買い物した荷物を運ぶ',
        memberId: null,
      },
      hw002: {
        point: 1,
        frequency: {
          key: DAYS_OF_WEEK,
          values: {
            temporary: null,
            daysOfWeek: [6],
          },
        },
        title: '買い物した荷物を冷蔵庫へ入れる',
        memberId: null,
      },
      hw003: {
        point: 3,
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
      hw004: {
        point: 1,
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
      hw005: {
        point: 1,
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
      hw006: {
        point: 3,
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
      hw007: {
        point: 1,
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
      hw008: {
        point: 2,
        frequency: {
          key: TEMPORARY,
          values: {
            temporary: null,
          },
        },
        title: '包丁を研ぐ',
        memberId: null,
      },
      hw009: {
        point: 1,
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
  },
  // 掃除
  c007: {
    category: '掃除',
    taskDetails: {
      hw000: {
        point: 2,
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
      hw001: {
        point: 1,
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
      hw002: {
        point: 1,
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
      hw003: {
        point: 1,
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
      hw004: {
        point: 1,
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
  },
  // 季節ごと
  c008: {
    category: '季節ごと',
    taskDetails: {
      hw000: {
        point: 3,
        frequency: {
          key: TEMPORARY,
          values: {
            temporary: null,
          },
        },
        title: '除／加湿器の洗浄',
        memberId: null,
      },
      hw001: {
        point: 5,
        frequency: {
          key: TEMPORARY,
          values: {
            temporary: null,
          },
        },
        title: 'エアコンの掃除',
        memberId: null,
      },
      hw002: {
        point: 5,
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
  },
  // 猫ちゃん
  c009: {
    category: '猫ちゃん',
    taskDetails: {
      hw000: {
        point: 1,
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
      hw001: {
        point: 1,
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
      hw002: {
        point: 1,
        frequency: {
          key: TEMPORARY,
          values: {
            temporary: null,
          },
        },
        title: 'えさ補充',
        memberId: null,
      },
      hw003: {
        point: 3,
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
      hw004: {
        point: 1,
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
      hw005: {
        point: 1,
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
      hw006: {
        point: 1,
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
      hw007: {
        point: 2,
        frequency: {
          key: DAYS_OF_WEEK,
          values: {
            temporary: null,
            daysOfWeek: [4],
          },
        },
        title: 'おしっこシートを替える',
        memberId: null,
      },
      hw008: {
        point: 1,
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
      hw009: {
        point: 2,
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
      hw010: {
        point: 2,
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
      hw011: {
        point: 4,
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
  },
  // ごみ
  c010: {
    category: 'ごみ',
    taskDetails: {
      hw000: {
        point: 2,
        frequency: {
          key: DAYS_OF_WEEK,
          values: {
            temporary: null,
            daysOfWeek: [1, 4],
          },
        },
        title: '可燃ごみ',
        memberId: null,
      },
      hw001: {
        point: 1,
        frequency: {
          key: DAYS_OF_WEEK,
          values: {
            temporary: null,
            daysOfWeek: [0],
          },
        },
        title: 'プラスチック',
        memberId: null,
      },
      hw002: {
        point: 1,
        frequency: {
          key: DAYS_OF_WEEK,
          values: {
            temporary: null,
            daysOfWeek: [0],
          },
        },
        title: '缶・ビン',
        memberId: null,
      },
      hw003: {
        point: 1,
        frequency: {
          key: DAYS_OF_WEEK,
          values: {
            temporary: null,
            daysOfWeek: [5],
          },
        },
        title: 'ペットボトル',
        memberId: null,
      },
      hw004: {
        point: 1,
        frequency: {
          key: DAYS_OF_WEEK,
          values: {
            temporary: null,
            daysOfWeek: [5],
          },
        },
        title: '段ボール',
        memberId: null,
      },
      hw005: {
        point: 1,
        frequency: {
          key: TEMPORARY,
          values: {
            temporary: null,
          },
        },
        title: '不燃ごみ',
        memberId: null,
      },
      hw006: {
        point: 1,
        frequency: {
          key: TEMPORARY,
          values: {
            temporary: null,
          },
        },
        title: '粗大ごみ',
        memberId: null,
      },
      hw007: {
        point: 1,
        frequency: {
          key: TEMPORARY,
          values: {
            temporary: null,
          },
        },
        title: '粗大ごみを申し込む',
        memberId: null,
      },
      hw008: {
        point: 1,
        frequency: {
          key: TEMPORARY,
          values: {
            temporary: null,
          },
        },
        title: '粗大ごみ券を買う',
        memberId: null,
      },
      hw009: {
        point: 2,
        frequency: {
          key: TEMPORARY,
          values: {
            temporary: null,
          },
        },
        title: 'ごみ箱を洗う',
        memberId: null,
      },
      hw010: {
        point: 1,
        frequency: {
          key: DAYS_OF_WEEK,
          values: {
            temporary: null,
            daysOfWeek: [0, 1, 4],
          },
        },
        title: 'ごみ袋を装着する',
        memberId: null,
      },
    },
  },
}

export default defaultHousework
