import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SignIn from '../components/SignIn';
import { RootState } from '../stores';
import StyledPaper from '../components/atoms/StyledPaper';
import Calendar from '../components/Calendar';
import {
    getHousesFromFirestore,
    getMemberFromFirestore,
    setHouseToFirestore,
    setMemberToFirestore,
} from '../handlers/firestoreHandler';
import { updateHousesStatus, updateMembersStatus } from '../stores/houses';
import { House, Member } from '../utils/types';

const Home: React.FC = () => {
    const dispatch = useDispatch();
    const uid = useSelector((rootState: RootState) => rootState.auth.user?.uid);

    useEffect(() => {
        if (!uid) return;

        const init = async () => {
            const houses: House[] = await getHousesFromFirestore(uid);
            if (houses.length > 0) {
                dispatch(updateHousesStatus(houses));
                const allMemberIds: string[] = houses.flatMap(
                    (house) => house.memberIds
                );
                const allMemberIdsSet = new Set(allMemberIds);
                const tasks = Array.from(allMemberIdsSet).map((id) =>
                    getMemberFromFirestore(id)
                );
                const members = await Promise.all(tasks);
                dispatch(updateMembersStatus(members));
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

    if (!uid) return <SignIn />;
    return (
        <StyledPaper>
            <Calendar />
        </StyledPaper>
    );
};

export default Home;
