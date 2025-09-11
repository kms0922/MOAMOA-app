import React, { useState, useMemo } from "react";
import Calendar from "./Calendar";
import EntryDetail from "./EntryDetail";

// 날짜 객체를 'YYYY-M-D' 형식의 문자열 키로 변환하는 헬퍼 함수
const formatDateKey = (date) => {
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
};

function App() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  //'journal'(기존의 entries) 전체 기록임을 명확히 함
  const [journal, setJournal] = useState({});

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
  };

  // 'handleSaveEntry' -> 'addEntry'로 변경
  const addEntry = (newEntryData) => {
    if (!selectedDate) return;
    const formattedDate = formatDateKey(selectedDate);
    const currentDay = journal[formattedDate] || { list: [], mainEntryId: null };

    const now = new Date();
    const timestamp = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const entryToAdd = { id: Date.now(), ...newEntryData, timestamp };

    const updatedList = [...currentDay.list, entryToAdd];

    setJournal({
      ...journal,
      [formattedDate]: { ...currentDay, list: updatedList },
    });
  };

  // 'handleSetMainEntry' -> 'setMainEntry'로 변경
  const setMainEntry = (entryId) => {
    if (!selectedDate) return;
    const formattedDate = formatDateKey(selectedDate);
    const currentDay = journal[formattedDate];

    setJournal({
      ...journal,
      [formattedDate]: { ...currentDay, mainEntryId: entryId },
    });
  };

  // 'handleDeleteEntry' -> 'deleteEntry'로 변경
  const deleteEntry = (entryId) => {
    if (!selectedDate) return;
    const formattedDate = formatDateKey(selectedDate);
    const currentDay = journal[formattedDate];
    const updatedList = currentDay.list.filter(entry => entry.id !== entryId);

    // 삭제된 항목이 대표 항목이었다면, 대표 항목 ID를 null로 설정
    const newMainEntryId = currentDay.mainEntryId === entryId ? null : currentDay.mainEntryId;

    setJournal({
      ...journal,
      [formattedDate]: { ...currentDay, list: updatedList, mainEntryId: newMainEntryId },
    });
  };

  const handleFabClick = () => {
    setSelectedDate(new Date());
  };

  const selectedFormattedDate = selectedDate ? formatDateKey(selectedDate) : null;
  const selectedDay = selectedFormattedDate ? journal[selectedFormattedDate] : null;

  const monthlyStats = useMemo(() => {
    let totalAmount = 0;
    const categoryAmounts = {};
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    for (const dateKey in journal) {
      const [year, month] = dateKey.split('-').map(Number);
      if (year === currentYear && month === currentMonth) {
        journal[dateKey].list.forEach(entry => {
          totalAmount += entry.amount;
          categoryAmounts[entry.category] = (categoryAmounts[entry.category] || 0) + entry.amount;
        });
      }
    }
    return { totalAmount, categoryAmounts };
  }, [journal, currentDate]);

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
            journal={journal}
            selectedDate={selectedDate}
          />
          {selectedDate && (
            <EntryDetail
              date={selectedDate}
              selectedDay={selectedDay}
              onAddEntry={addEntry}
              onClose={handleCloseDetail}
              onSetMainEntry={setMainEntry}
              onDeleteEntry={deleteEntry}
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
              <p style={{ textAlign: 'center', color: '#888', marginTop: '1rem' }}>내역 없음</p>
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
