import React, { useState, useMemo } from "react";
import Calendar from "./Calendar";
import EntryDetail from "./EntryDetail";

function App() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [entries, setEntries] = useState({});
  const [mainEntryIds, setMainEntryIds] = useState([]);

  console.log(entries)

  const handlePrevMonth = () => {
    setCurrentDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1));
  };
  const handleNextMonth = () => {
    setCurrentDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1));
  };

  const handleDateClick = (date) => {
    setSelectedDate(date); 
  };
  
  const handleCloseDetail = () => {
    setSelectedDate(null);
  }

  const handleSaveEntry = (entryData) => {
    if (!selectedDate) return;
    const dateKey = `${selectedDate.getFullYear()}-${selectedDate.getMonth()}-${selectedDate.getDate()}`;
    const existingEntries = entries[dateKey] || [];

    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const timestamp = `${hours}:${minutes}`;

    const newEntriesForDate = [...existingEntries, { id: Date.now(), ...entryData, timestamp }];

    setEntries({
      ...entries,
      [dateKey]: newEntriesForDate,
    });
  };

  const handleSetMainEntry = (entryId) => {
    console.log(mainEntryIds);
    setMainEntryIds(prevIds => (prevIds.concat([entryId])));
  };

  const handleDeleteEntry = (dateKey, entryId) => {
    const dayEntries = entries[dateKey] || [];
    const newEntries = dayEntries.filter(entry => entry.id !== entryId);

    setEntries(prevEntries => ({
      ...prevEntries,
      [dateKey]: newEntries,
      id: newEntries
    }));

    if (mainEntryIds[dateKey] === entryId) {
      setMainEntryIds(prevIds => {
        const newIds = { ...prevIds };
        delete newIds[dateKey];
        return newIds;
      });
    }
  };

  const handleFabClick = () => {
    setSelectedDate(new Date());
  };
  
  const selectedDateKey = selectedDate ? `${selectedDate.getFullYear()}-${selectedDate.getMonth()}-${selectedDate.getDate()}` : null;
  const selectedDateEntries = selectedDateKey ? entries[selectedDateKey] || [] : [];
  const selectedMainEntryId = selectedDateKey ? mainEntryIds[selectedDateKey] : null;

  const monthlyStats = useMemo(() => {
    const currentMonthEntries = [];
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    for (const dateKey in entries) {
      const [year, month] = dateKey.split('-').map(Number);

      if (year === currentYear && month === currentMonth) {
        currentMonthEntries.push(...entries[dateKey]);
      }
    }

    const totalAmount = currentMonthEntries.reduce((sum, entry) => sum + entry.amount, 0);
    const categoryAmounts = currentMonthEntries.reduce((acc, entry) => {
      acc[entry.category] = (acc[entry.category] || 0) + entry.amount;
      return acc;
    }, {});
    
    return { totalAmount, categoryAmounts };
  }, [entries, currentDate]);

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>MOAMOA</h1>
        <div style={styles.navigation}>
          <button onClick={handlePrevMonth}>&lt;</button>
          <h2>{`${currentDate.getFullYear()}년 ${currentDate.getMonth() + 1}월`}</h2>
          <button onClick={handleNextMonth}>&gt;</button>
        </div>
      </header>

      <main style={styles.main}>
        <section style={styles.calendarSection}>
          <Calendar 
            currentDate={currentDate} 
            onDateClick={handleDateClick}
            entries={entries}
            selectedDate={selectedDate}
            mainEntryIds={mainEntryIds}
          />
          {selectedDate && (
            <EntryDetail 
              date={selectedDate}
              entries={selectedDateEntries}
              onSave={handleSaveEntry}
              onClose={handleCloseDetail}
              dateKey={selectedDateKey}
              mainEntryId={mainEntryIds}
              onSetMain={handleSetMainEntry}
              onDelete={handleDeleteEntry}
            />
          )}
        </section>

        <aside style={styles.statsSection}>
          <h3>이달의 지출 통계</h3>
          <div>
            <strong>총 지출:</strong> {monthlyStats.totalAmount.toLocaleString()}원
          </div>
          <hr style={styles.hr} />
          <div>
            <strong>카테고리별 지출:</strong>
            {Object.keys(monthlyStats.categoryAmounts).length > 0 ? (
              <ul style={styles.categoryList}>
                {Object.entries(monthlyStats.categoryAmounts).map(([category, amount]) => (
                  <li key={category}>
                    {category}: {amount.toLocaleString()}원
                  </li>
                ))}
              </ul>
            ) : (
              <p style={{textAlign: 'center', color: '#888', marginTop: '1rem'}}>내역 없음</p>
            )}
          </div>
        </aside>
      </main>

      <button style={styles.fab} onClick={handleFabClick}>+</button>
    </div>
  );
}

const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      fontFamily: 'sans-serif',
      height: "100vh",
      maxWidth: '768px',
      margin: '0 auto',
      border: '1px solid #eee',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    },
    header: {
      padding: '1rem',
      backgroundColor: '#f8f9fa',
      borderBottom: '1px solid #dee2e6',
      textAlign: 'center',
    },
    navigation: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: '1rem',
    },
    main: {
      flex: 1,
      display: 'flex',
      padding: '1rem',
      overflowY: 'auto',
    },
    calendarSection: {
        flex: 3,
        marginRight: '1rem',
        display: 'flex',
        flexDirection: 'column',
      },
    statsSection: {
      flex: 1,
      padding: '1rem',
      border: '1px dashed #ccc',
      backgroundColor: '#f1f3f5',
    },
    hr: {
      border: 'none',
      borderTop: '1px solid #ddd',
      margin: '0.5rem 0',
    },
    categoryList: {
      listStyle: 'none',
      padding: 0,
      marginTop: '0.5rem',
    },
    fab: {
      position: 'fixed',
      right: '30px',
      bottom: '30px',
      width: '60px',
      height: '60px',
      borderRadius: '50%',
      backgroundColor: '#007bff',
      color: 'white',
      border: 'none',
      fontSize: '2rem',
      cursor: 'pointer',
      boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
    }
};

export default App;

