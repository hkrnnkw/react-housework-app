import * as React from 'react';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { CalendarPicker, LocalizationProvider } from '@mui/lab';

const Calendar = (): JSX.Element => {
    const [date, setDate] = React.useState<Date | null>(new Date());

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
