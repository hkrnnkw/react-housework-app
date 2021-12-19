import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { CalendarPicker, LocalizationProvider } from '@mui/lab';
import {
    getHousesFromFirestore,
    getMemberFromFirestore,
    setHouseToFirestore,
    setMemberToFirestore,
} from '../handlers/firestoreHandler';
import { updateHousesStatus, updateMembersStatus } from '../stores/houses';
import { Day, House, Member, Month, MonthNum } from '../utils/types';
import { RootState } from '../stores';
import StyledPaper from './atoms/StyledPaper';

type Props = {
    uid: string;
};

const Calendar: React.FC<Props> = ({ uid }): JSX.Element => {
    const dispatch = useDispatch();
    const [date, setDate] = useState<Date | null>(new Date());
    const [dailyTasksOfTheMonth, setDailyTasksOfTheMonth] = useState<Day>(
        {} as Day
    );
    const { houses, members } = useSelector(
        (rootState: RootState) => rootState.houses
    );

    useEffect(() => {
        const init = async () => {
            const housesFromFirestore: House[] = await getHousesFromFirestore(
                uid
            );
            if (housesFromFirestore.length > 0) {
                dispatch(updateHousesStatus(housesFromFirestore));
                const allMemberIds: string[] = housesFromFirestore.flatMap(
                    (house) => house.memberIds
                );
                const allMemberIdsSet = new Set(allMemberIds);
                const tasks = Array.from(allMemberIdsSet).map((id) =>
                    getMemberFromFirestore(id)
                );
                const membersFromFirestore = await Promise.all(tasks);
                dispatch(updateMembersStatus(membersFromFirestore));
            } else {
                const newHouse: House = await setHouseToFirestore(uid);
                dispatch(updateHousesStatus([newHouse]));
                const newUser: Member = await setMemberToFirestore(uid);
                dispatch(updateMembersStatus([newUser]));
            }
        };
        // eslint-disable-next-line no-console
        init().catch((error) => console.error(error));
    }, [dispatch, uid]);

    useEffect(() => {
        if (!date) return;
        const houseOnDisplay = houses[0]; // TODO 表示中のhouseに置き換える
        const year = date.getFullYear();
        const monthNum = (date.getMonth() + 1) as MonthNum;
        const month: Month = houseOnDisplay.logs[year] ?? {
            [monthNum]: {} as Day,
        };
        const day: Day = month[monthNum];
        setDailyTasksOfTheMonth(day);
    }, [date, houses]);

    return (
        <StyledPaper>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <CalendarPicker
                    date={date}
                    onChange={(newDate) => setDate(newDate)}
                />
            </LocalizationProvider>
        </StyledPaper>
    );
};

export default Calendar;
