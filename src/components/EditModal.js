import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import { doc, getDoc, getFirestore, updateDoc } from "firebase/firestore";
import { useSearchParams } from 'next/navigation';
import { app } from '@/firebase-config/firebase-methords';

const Modal = ({ isOpen, onClose,onChangeTrello }) => {
  const [code, setCode] = useState("");
  const [title, setTitle] = useState("");
  const [loading, setLoading]=useState(false)
  const db = getFirestore(app);
  const searchParams = useSearchParams()
  const cardId= searchParams.get("cardId")
  const laneId= searchParams.get("laneId")

  
  useEffect(()=>{
 if(cardId){
     const docRef = doc(db, "cards", cardId);
    (async () => {
      const docSnap = await getDoc(docRef);
      const data=docSnap.data()
      console.log(data.title,"")
      setTitle(data.title||"")
      setCode(data.description||"")
    })();}
  },[db,cardId])

  

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ size: [] }],
      [{ font: [] }],
      [{ align: ["right", "center", "justify"] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      [{ color: ["red", "#785412"] }],
      [{ background: ["red", "#785412"] }]
    ]
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "color",
    "image",
    "background",
    "align",
    "size",
    "font"
  ];

  const handleProcedureContentChange = (content, delta, source, editor) => {
    setCode(content);
  };
  const handleSave=async()=>{
    const esiitRef = doc(db, "cards", cardId);
    setLoading(true)
    await updateDoc(esiitRef,{
      title:title,
      description:code,
    }) 
    setLoading(false)
    onClose()
    onChangeTrello(laneId,cardId,title)
  }
  return (
    <>
      {isOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-100 opacity-50" onClick={onClose}></div>
            </div>
            <div className="relative bg-white rounded-lg w-[90%] min-h-[70vh] mx-auto p-6">
              <div className="text-center">
                <div className="mb-4">
                  <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Title:</label>
                  <input
                   value={title}
                   onChange={(e)=>setTitle(e.target.value)}
                   type="text" id="title" name="title" className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500" placeholder="Enter title..." />
                </div>
                <div className="mb-4 max-h-32">
                  <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Description:</label>
                  <ReactQuill
                    theme="snow"
                    modules={modules}
                    formats={formats}
                    value={code}
                    onChange={handleProcedureContentChange}
                    className='h-32'
                  />
                </div>
              </div>
              <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                <button className="bg-blue-500 text-white rounded-md px-4 py-2 mr-2" onClick={handleSave}>{loading?"Saveing":"Save"}</button>
                <button className="bg-gray-300 text-gray-700 rounded-md px-4 py-2" onClick={onClose}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
