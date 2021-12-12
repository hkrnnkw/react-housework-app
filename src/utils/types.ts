export type AppUser = {
    uid: string;
    displayName: string;
    email: string;
    photoURL: string | null;
    refreshToken: string;
    emailVerified: boolean;
};

type Routine = {
    times: number;
    unit: 'Daily' | 'Weekly' | 'Monthly' | 'Yearly';
};

type EveryXDays = {
    times: number;
    days: number;
};

type Fixed =
    | 'Monday'
    | 'Tuesday'
    | 'Wednesday'
    | 'Thursday'
    | 'Friday'
    | 'Saturday'
    | 'Sunday';

type Task = {
    houseworkId: string;
    isCompleted: boolean;
};

type Role = {
    memberId: string;
    tasks: Task[];
};

type DayNum =
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
type Day = {
    [day in DayNum]: Role[];
};

type MonthNum = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
type Month = {
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
        frequency: Routine | EveryXDays | Fixed[] | 'Temporary' | null;
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
