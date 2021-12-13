import React, { useEffect } from 'react';
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
import { House, Member } from '../utils/types';
import { RootState } from '../stores';

type Props = {
    uid: string;
};

const Calendar: React.FC<Props> = ({ uid }): JSX.Element => {
    const dispatch = useDispatch();
    const [date, setDate] = React.useState<Date | null>(new Date());
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

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <CalendarPicker
                date={date}
                onChange={(newDate) => setDate(newDate)}
            />
        </LocalizationProvider>
    );
};

export default Calendar;
