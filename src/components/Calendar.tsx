import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { CalendarPicker, LocalizationProvider } from '@mui/lab';
import { RootState } from '../stores';
import { setSelectingDate } from '../stores/houses';

const Calendar: React.FC = (): JSX.Element => {
    const dispatch = useDispatch();
    const { selectingDate } = useSelector(
        (rootState: RootState) => rootState.houses
    );
    const [date, setDate] = useState<Date | null>(null);

    useEffect(() => {
        if (selectingDate) {
            setDate(new Date(selectingDate));
        } else {
            setDate(null);
        }
    }, [selectingDate]);

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <CalendarPicker
                date={date}
                onChange={(newDate) => {
                    if (newDate) {
                        dispatch(setSelectingDate(newDate.getTime()));
                    } else {
                        dispatch(setSelectingDate(null));
                    }
                }}
            />
        </LocalizationProvider>
    );
};

export default Calendar;
