import React, { useRef } from 'react';


const NewCardForm = ({ onAdd, onCancel }) => {

  const titleRef = useRef(null);
  const descRef = useRef(null);

  const handleAdd = () => {
    onAdd({ title: titleRef.current.value,label:descRef.current.value});
  };

  return (
    <div style={{ background: 'white', borderRadius: 3, border: '1px solid #eee', borderBottom: '1px solid #ccc' }}>
      <div style={{ padding: 5, }}>
        <div>
          <div style={{ marginBottom: 5 }}>
            <input type="text" ref={titleRef} placeholder="Title" />
            
          </div>
          <div style={{ marginBottom: 5 }}>
            <input type="text" ref={descRef} placeholder="Type" />
          </div>
        </div>
        <div className='flex mt-2'>

        <button  className="text-white bg-black p-1 ms-1 rounded-lg text-sm"onClick={handleAdd} >Add</button>
        <button className='bg-gray-300 text-gray-700 rounded-md p-1 ms-5 text-sm' onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default NewCardForm
