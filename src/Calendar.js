import React, { useState } from "react";

const Calendar = () => {
    const [today, setToday] = useState(new Date());

    const year = today.getFullYear();
    const month = today.getMonth();

    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const lastDateOfMonth = new Date(year, month + 1, 0).getDate();

    const renderCalendar = () => {
        const calendarDays = [];
        const daysOfweek = ['일', '월', '화', '수', '목', '금', '토'];

        for (let day of daysOfWeek) {
            calendarDays.push(<div key={'day-header-${day}'} style={styles.dayHeader}>{day}</div>);
        }

        for (let i = 0; i < firstDayOfMonth; i++) {
            calendarDays.push(<div key={'empty-${i}'} style={styles.dayCell}></div>);
        }

        for (let date = 1; date <= lastDateOfMonth; date++) {
            calendarDays.push(
                <div key={'date-${date}'} style={styles.dayCell}>
                    {date}
                </div>
            );
        }
        
        return calendarDays;

    };

    return (
        <div style={styles.calendarContainer}>
            <div style={styles.CalendarGrid}>
                {renderCalendar()}
            </div>
        </div>
    );
};

const styles = {
    calendarContainer: {
        width: '100%',
    },
    CalendarGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 1fr)',
        gap: '5px',
    },
    dayHeader: {
        textAlign: 'center',
        fontWeight: 'bold',
        padding: '10px 0',
    },
    dayCell: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100px',
        border: '1px solid #f0f0f0',
        borderRadius: '8px',
        cursor: 'pointer',
    }
};

export default Calendar;