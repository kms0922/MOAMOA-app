import React from "react";

function App() {
  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>MOAMOA</h1>
        <div style={styles.navigation}>
          <button>&lt;</button>
          <h2>2025년 9월</h2>
          <button>&gt;</button>
        </div>
      </header>

      <main style={styles.main}>
        <section style={styles.calendarSection}>
          <p>여기에 캘린더가 표시됩니다.</p>
        </section>

        <aside style={styles.statsSection}>
          <h3>이달의 지출 통계</h3>
          <p>여기에 통계가 표시됩니다.</p>
        </aside>
      </main>

      <button style={styles.fab}>+</button>
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
    overFlowY: 'auto',
  },
  calendarSection: {
    flex: 3,
    marginRight: '1rem',
    padding: '1rem',
    border: '1px dashed #ccc',
  },
  statsSection: {
    flex: 1,
    padding: '1rem',
    border: '1px dashed #ccc',
    backgroundColor: '#f1f3f5',
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