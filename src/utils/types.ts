export type AppUser = {
    uid: string;
    displayName: string;
    email: string;
    photoURL: string | null;
    refreshToken: string;
    emailVerified: boolean;
};

type EveryXDays = {
    times: number;
    days: number;
};

type SpecificDayOfWeek =
    | 'Monday'
    | 'Tuesday'
    | 'Wednesday'
    | 'Thursday'
    | 'Friday'
    | 'Saturday'
    | 'Sunday';

type SpecificDate = {
    month: number;
    day: number;
};

export type Role = {
    memberId: string;
    houseworkId: string;
    isCompleted: boolean;
};

export type DayNum =
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 13
    | 14
    | 15
    | 16
    | 17
    | 18
    | 19
    | 20
    | 21
    | 22
    | 23
    | 24
    | 25
    | 26
    | 27
    | 28
    | 29
    | 30
    | 31;
export type Day = {
    [day in DayNum]: Role[];
};

export type MonthNum = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export type Month = {
    [month in MonthNum]: Day;
};

export type Year = {
    [year: number]: Month;
};

export type Member = {
    id: string;
    name: string;
    avatar: string;
};

export type Housework = {
    [id: string]: {
        id: string;
        points: 1 | 2 | 3 | 4 | 5;
        frequency:
            | EveryXDays
            | SpecificDayOfWeek[]
            | SpecificDate[]
            | 'Temporary'
            | null;
        categoryId: string;
        description: string;
        memberId?: string;
    };
};

export type Category = {
    [id: string]: string;
};

export type House = {
    id: string;
    logs: Year;
    memberIds: string[];
    housework: Housework;
    categories: Category;
};
