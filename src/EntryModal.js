import React, { useState } from "react";

const EntryModal = ({ isOpen, onClose, date, onSave }) => {
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    
    if(!isOpen) {
        return null;
    }

    const handleSave = () => {
        console.log("저장 버튼 클릭됨!"); // 확인하기 쉽도록 텍스트를 추가했습니다.
        if(!amount || !category) {
            // alert()는 테스트 환경에 따라 보이지 않을 수 있으니 console.warn으로 변경합니다.
            console.warn("금액과 카테고리를 모두 입력해주세요.");
            return;
        }
        onSave({ amount: parseFloat(amount), category });
    };

    return (
        // [수정] 모든 StyleSheet를 styles로 변경했습니다.
        <div style={styles.modalOverlay}>
            <div style={styles.modalContent}>
                <h2>{`${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`}</h2>

                <form>
                    <div style={styles.formGroup}>
                        <label>금액</label>
                        <input 
                        type="number" 
                        style={styles.input} 
                        placeholder="금액을 입력하세요" 
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <label>카테고리</label>
                        <input 
                        type="text" 
                        style={styles.input} 
                        placeholder="예: 식비, 교통" 
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        />
                    </div>
                </form>

                <div style={styles.buttonGroup}>
                    <button onClick={onClose} style ={styles.cancelButton}>취소</button>
                    <button onClick={handleSave} style={styles.saveButton}>저장</button>
                </div>
            </div>
        </div>
    );
};

// styles 객체는 그대로 유지합니다.
const styles = {
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '10px',
    width: '90%',
    maxWidth: '500px',
  },
  formGroup: {
    marginBottom: '1rem',
  },
  input: {
    width: '100%',
    padding: '0.5rem',
    marginTop: '0.5rem',
    boxSizing: 'border-box',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '2rem',
  },
  cancelButton: {
    padding: '0.5rem 1rem',
    marginRight: '0.5rem',
    border: '1px solid #ccc',
    borderRadius: '5px',
    cursor: 'pointer',
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

export default EntryModal;

