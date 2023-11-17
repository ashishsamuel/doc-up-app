import React, { useEffect } from 'react'
import 'react-quill/dist/quill.snow.css';
import { useState } from 'react';
import ReactQuill from 'react-quill';
import { db } from '../Config/firebase-config';
import { addDoc, collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';

function DocumentTextPage() {
    const [documentNote,setDocumentNote] = useState("")
    const [specificDocument,setSpecificDocument] = useState({})
    const {id} = useParams();
    const documentsCollectionRef = doc(db,"document",id)

    useEffect(()=>{
      getDocumentDetails()
    },[])

    const getDocumentDetails = async()=>{
      try{
          const docNeeded = await getDoc(documentsCollectionRef)
          console.log(docNeeded.data());
          const data = docNeeded.data()
          setSpecificDocument(data)
          setDocumentNote(data.note.replace(/<\/?[^>]+(>|$)/g,""))
          console.log(specificDocument);
  
      }catch(err){
          console.log(err);
      }
      
  }

  var toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
  ['blockquote', 'code-block'],

  [{ 'header': 1 }, { 'header': 2 }],               // custom button values
  [{ 'list': 'ordered'}, { 'list': 'bullet' }],

  [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

  [{ 'font': [] }],
  [{ 'align': [] }],

  ['clean']]
  const module = {
    toolbar: toolbarOptions
  } 

  const saveDocumentText = async()=>{
    console.log("document note in save",documentNote);
    // if(documentNote!=""){
        try{
          await updateDoc(documentsCollectionRef,{note:documentNote.replace(/<\/?[^>]+(>|$)/g,"")})
        }
        catch(err){
            console.log(err);
        }
    // }
    // else{
    //     toast.warning("Please provide any text")
    // }
  }

  const updateDocumentText = ()=>{
    // const {value} = e.target
    console.log("inside on change function");
    // console.log(value);
    setDocumentNote("hi how are you")
  }

  return (
    <div className='text-center container mt-4'>
        <ReactQuill modules={module} theme='snow' value={documentNote} onChange={setDocumentNote}/>
        <button className='btn btn-primary mt-3' onClick={saveDocumentText}>Save</button>
      </div>
  )
}

export default DocumentTextPage
