import React, { useState } from 'react';

const EntryDetail = ({ date, selectedDay, onAddEntry, onClose, onSetMainEntry, onDeleteEntry }) => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [imagePreview, setImagePreview] = useState(null);

  // selectedDay가 존재하면 list와 mainEntryId를 가져오고, 없으면 기본값 사용
  const { list: entryList = [], mainEntryId = null } = selectedDay || {};

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (!amount || !category) {
      alert('금액과 카테고리를 모두 입력해주세요.');
      return;
    }
    const newEntry = {
      amount: parseFloat(amount),
      category,
      image: imagePreview
    };
    onAddEntry(newEntry);

    // 입력 필드 초기화
    setAmount('');
    setCategory('');
    setImagePreview(null);
  };

  return (
    <div style={styles.detailContainer}>
      <div style={styles.detailHeader}>
        <h3>{`${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`}</h3>
        <button onClick={onClose} style={styles.closeButton}>×</button>
      </div>

      <div style={styles.entryList}>
        {entryList.length > 0 ? (
          entryList.map(entry => {
            const isMain = mainEntryId === entry.id;
            return (
              <div key={entry.id} style={styles.entryItem}>
                <button onClick={() => onSetMainEntry(entry.id)} style={isMain ? styles.mainButtonActive : styles.mainButton}>
                  ★
                </button>
                {entry.image && (
                  <img src={entry.image} alt={entry.category} style={styles.entryImage} />
                )}
                <div style={styles.entryText}>
                  <span style={{ flex: 1 }}>{entry.category}</span>
                  <span style={styles.entryTimestamp}>{entry.timestamp}</span>
                  <span>{entry.amount.toLocaleString()}원</span>
                </div>
                <button onClick={() => onDeleteEntry(entry.id)} style={styles.deleteButton}>×</button>
              </div>
            )
          })
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
        <label style={styles.imageUploadButton}>
          사진
          <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
        </label>
        <button onClick={handleSave} style={styles.saveButton}>추가</button>
      </div>
      {imagePreview && (
        <div style={styles.previewContainer}>
          <img src={imagePreview} alt="Preview" style={styles.previewImage} />
        </div>
      )}
    </div>
  );
};


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
        maxHeight: '200px',
        overflowY: 'auto',
    },
    entryItem: {
        display: 'flex',
        alignItems: 'center',
        padding: '0.5rem 0',
        borderBottom: '1px solid #eee',
        gap: '10px',
    },
    mainButton: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: '#ccc',
      fontSize: '1.2rem',
      padding: '0 5px'
    },
    mainButtonActive: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: '#ffc107',
      fontSize: '1.2rem',
      padding: '0 5px'
    },
    deleteButton: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: '#dc3545',
      fontSize: '1.2rem',
      padding: '0 5px',
      fontWeight: 'bold'
    },
    entryImage: {
        width: '40px',
        height: '40px',
        borderRadius: '4px',
        objectFit: 'cover',
    },
    entryText: {
        flex: 1,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '10px'
    },
    entryTimestamp: {
      fontSize: '0.8em',
      color: '#888',
      margin: '0 10px',
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
    imageUploadButton: {
        padding: '0.5rem 1rem',
        backgroundColor: '#6c757d',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        display: 'inline-block',
        textAlign: 'center',
        lineHeight: '1.5',
    },
    saveButton: {
        padding: '0.5rem 1rem',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    previewContainer: {
        marginTop: '1rem',
        textAlign: 'center',
    },
    previewImage: {
        maxWidth: '100px',
        maxHeight: '100px',
        borderRadius: '4px',
    }
};

export default EntryDetail;
