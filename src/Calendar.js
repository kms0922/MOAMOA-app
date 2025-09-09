import React from "react";

const Calendar = ({ currentDate, onDateClick, entries, selectedDate }) => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const lastDateOfMonth = new Date(year, month + 1, 0).getDate();

    const renderCalendar = () => {
        const calendarDays = [];
        const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];

        for (let day of daysOfWeek) {
            calendarDays.push(<div key={`day-header-${day}`} style={styles.dayHeader}>{day}</div>);
        }

        for (let i = 0; i < firstDayOfMonth; i++) {
            calendarDays.push(<div key={`empty-${i}`} style={styles.dayCell}></div>);
        }

        for (let date = 1; date <= lastDateOfMonth; date++) {
            const fullDate = new Date(year, month, date);
            const dateKey = `${year}-${month}-${date}`;
            const dayEntries = entries[dateKey] || [];
            
            const isSelected = selectedDate && 
                               selectedDate.getFullYear() === year &&
                               selectedDate.getMonth() === month &&
                               selectedDate.getDate() === date;

            const cellStyle = {
                ...styles.dayCell,
                position: 'relative',
                backgroundColor: isSelected ? '#eaf6ff' : 'white',
                fontWeight: isSelected ? 'bold' : 'normal',
            };

            calendarDays.push(
                <div key={`date-${date}`} style={cellStyle} onClick={() => onDateClick(fullDate)}>
                    {date}
                    {dayEntries.length > 0 && <div style={styles.entryIndicator}></div>}
                </div>
            );
        }
        
        return calendarDays;
    };

    return (
        <div style={styles.calendarContainer}>
            <div style={styles.calendarGrid}>
                {renderCalendar()}
            </div>
        </div>
    );
};

const styles = {
    calendarContainer: {
        width: '100%',
    },
    calendarGrid: {
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
        height: '80px',
        border: '1px solid #f0f0f0',
        borderRadius: '8px',
        cursor: 'pointer',
        transition: 'background-color 0.2s',
    },
    entryIndicator: {
        position: 'absolute',
        bottom: '8px',
        width: '6px',
        height: '6px',
        borderRadius: '50%',
        backgroundColor: '#007bff',
    }
};

export default Calendar;

