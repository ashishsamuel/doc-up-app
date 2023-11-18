import React, { useEffect } from 'react'
import 'react-quill/dist/quill.snow.css';
import { useState } from 'react';
import ReactQuill from 'react-quill';
import { db } from '../Config/firebase-config';
import { addDoc, collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from 'react-router-dom';
import './DocumentTextPage.css'

function DocumentTextPage() {
    const [documentNote,setDocumentNote] = useState("")
    const [documentTitle,setDocumentTitle] = useState("")
    // const [specificDocument,setSpecificDocument] = useState({})
    const {id} = useParams();
    const documentsCollectionRef = doc(db,"document",id)
    const navigate = useNavigate()

    useEffect(()=>{
      getDocumentDetails()
    },[])

    const getDocumentDetails = async()=>{
      try{
          const docNeeded = await getDoc(documentsCollectionRef)
          console.log(docNeeded.data());
          const data = docNeeded.data()
          // setSpecificDocument(data)
          setDocumentTitle(data.title)
          setDocumentNote(data.note.replace(/<\/?[^>]+(>|$)/g,""))
          // console.log(specificDocument);
  
      }catch(err){
          console.log(err);
      }
      
  }

  var toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],
  
    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }],                         // text direction
  
    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  
    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }],
  
    ['clean'] 
]

  const module = {
    toolbar: toolbarOptions
  } 

  const saveDocumentText = async()=>{
    console.log("document note in save",documentNote);
    if(documentNote!=""){
        try{
          await updateDoc(documentsCollectionRef,{note:documentNote.replace(/<\/?[^>]+(>|$)/g,"")})
          toast.success("Document updated sucessfully")
          setTimeout(() => {
            navigate('/')
          }, 3000);
        }
        catch(err){
            console.log(err);
        }
    }
    else{
        toast.warning("Please provide any text")
    }
  }

  return (
    <>
        <div className='container'>
          <h5 className='fw-bold mt-3 ms-2'>Title : <span className='text-info'>{documentTitle}</span></h5>
        <div className='text-center container mt-4' style={{height:'34vh'}}>
            <ReactQuill modules={module} theme='snow' value={documentNote} onChange={setDocumentNote} className='height-style'/>
          </div>
          <div className='d-flex justify-content-center align-items-center'>
            <button className='btn btn-primary mt-3' onClick={saveDocumentText}>Save</button>
          </div>
          <ToastContainer position='top-right' theme='colored' autoClose='2000'/>
        </div>
    </>
  )
}

export default DocumentTextPage
