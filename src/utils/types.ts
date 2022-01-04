export type AppUser = {
  uid: string;
  displayName: string;
  email: string;
  photoURL: string | null;
  refreshToken: string;
  emailVerified: boolean;
};

export type EveryXDays = {
  times: number;
  days: number;
};

export type SpecificDayOfWeek =
  | 'Sunday'
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday';

export type SpecificDate = {
  month: number;
  day: number;
};

export type Role = {
  memberId: string | null;
  houseworkId: string;
  isCompleted: boolean;
};

export type Day = {
  [day: number]: Role[];
};

export type Month = {
  [month: number]: Day;
};

export type Year = {
  [year: number]: Month;
};

export type Member = {
  id: string;
  name: string;
  avatar: string;
};

export const EVERY_X_DAYS = 'EveryXDays';
export const SPECIFIC_DAY_OF_WEEK = 'SpecificDayOfWeek';
export const SPECIFIC_DATE = 'SpecificDate';
export const TEMPORARY = 'Temporary';

export type Housework = {
  [id: string]: {
    id: string;
    points: 1 | 2 | 3 | 4 | 5;
    frequency:
      | EveryXDays
      | SpecificDayOfWeek[]
      | SpecificDate[]
      | typeof TEMPORARY
      | null;
    frequencyType:
      | typeof EVERY_X_DAYS
      | typeof SPECIFIC_DAY_OF_WEEK
      | typeof SPECIFIC_DATE
      | typeof TEMPORARY
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
