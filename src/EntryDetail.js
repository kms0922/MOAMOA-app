import React, { useState } from 'react';

const EntryDetail = ({ date, entries, onSave, onClose }) => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');

  const handleSave = () => {
    if (!amount || !category) {
      alert('금액과 카테고리를 모두 입력해주세요.');
      return;
    }
    onSave({ amount: parseFloat(amount), category });
    // 저장 후 입력 필드 초기화
    setAmount('');
    setCategory('');
  };

  return (
    <div style={styles.detailContainer}>
      <div style={styles.detailHeader}>
        <h3>{`${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`}</h3>
        <button onClick={onClose} style={styles.closeButton}></button>
      </div>

      <div style={styles.entryList}>
        {entries.length > 0 ? (
          entries.map(entry => (
            <div key={entry.id} style={styles.entryItem}>
              <span>{entry.category}</span>
              <span>{entry.amount.toLocaleString()}원</span>
            </div>
          ))
        ) : (
          <p style={styles.noEntryText}>입력된 내역이 없습니다.</p>
        )}
      </div>

      <hr style={styles.hr} />

      <div style={styles.formContainer}>
        <input 
          type="text" 
          style={styles.input} 
          placeholder="카테고리"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <input 
          type="number" 
          style={styles.input} 
          placeholder="금액"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button onClick={handleSave} style={styles.saveButton}>추가</button>
      </div>
    </div>
  );
};

// 이 컴포넌트에서만 사용하는 스타일 객체
const styles = {
    detailContainer: {
        marginTop: '1rem',
        padding: '1rem',
        border: '1px solid #eee',
        borderRadius: '8px',
        backgroundColor: '#f8f9fa'
    },
    detailHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1rem',
    },
    closeButton: {
        background: 'none',
        border: 'none',
        fontSize: '1.5rem',
        cursor: 'pointer'
    },
    entryList: {
        maxHeight: '150px',
        overflowY: 'auto',
    },
    entryItem: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '0.5rem 0',
        borderBottom: '1px solid #eee',
    },
    noEntryText: {
        textAlign: 'center',
        color: '#888',
    },
    hr: {
        border: 'none',
        borderTop: '1px solid #eee',
        margin: '1rem 0',
    },
    formContainer: {
        display: 'flex',
        gap: '0.5rem',
    },
    input: {
        flex: 1,
        padding: '0.5rem',
        border: '1px solid #ccc',
        borderRadius: '5px',
    },
    saveButton: {
        padding: '0.5rem 1rem',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    }
};

export default EntryDetail;
