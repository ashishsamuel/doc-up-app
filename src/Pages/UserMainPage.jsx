import React, { useEffect } from 'react'

import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Form } from 'react-bootstrap';
import { auth, db } from '../Config/firebase-config';
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

function UserMainPage() {
    const [documentList,setDocumentList] = useState([])
    const [documentTitle,setDocumentTitle] = useState("")
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const documentsCollectionRef = collection(db,"document")

    useEffect(()=>{
        getDocumentsList()
    },[])

    const createDocument = async()=>{
        if(documentTitle!=""){
        try{
            await addDoc(documentsCollectionRef,{
                title:documentTitle,
                note:"",
                userId:auth?.currentUser?.uid
            })
            getDocumentsList()

        }
        catch(err){
            console.log(err);
        }
        handleClose()
    }
    else{
        toast.warning("Please provide the title")
    }
    }

    const getDocumentsList = async()=>{
        try{
            const data = await getDocs(documentsCollectionRef)
            const filteredData = data.docs.map((doc)=>({
                ...doc.data(),
                id:doc.id
            }))
            console.log(filteredData);
            setDocumentList(filteredData)
        }catch(err){
            console.log(err);
        }
        
    }

    const deleteDocument = async(id)=>{
      console.log(id);
      const movieDoc = doc(db,"document",id)
      await deleteDoc(movieDoc)
      getDocumentsList()
    }

  return (
    <>
     <div className='d-flex flex-column mh-100 justify-content-center' style={{height:documentList.length>0?'auto':'37vh'}}>
     <div className='d-flex justify-content-around mt-3 flex-wrap'>
        {documentList && documentList.map((doc)=>(
            
                <div className='mt-4'>
                  
                      <Card style={{height:'200px',width:'18rem'}} className='bg-light'>
                <Card.Body>
                <div className='d-flex justify-content-between align-items-center'>
                  <Link to={`/updatedocument/${doc?.id}`} style={{textDecoration:'none',color:'black'}}>
                  <i class="fa-solid fa-file-pen fa-2x"></i>
                  </Link>
                  <div className='' style={{cursor:'pointer',height:'28px'}} onClick={()=>deleteDocument(doc.id)}><i class="fa-solid fa-trash fa-2x"></i></div>
                </div>

                  <Card.Title className='mt-3'>{doc?.title}</Card.Title>
                  <Card.Text>
                    {doc?.note}
                  </Card.Text>
                </Card.Body>
              </Card>
                  
                </div>
                
        ))}
            </div>

        <div className='my-4 d-flex justify-content-center align-items-center'>
          <button className='btn btn-primary' onClick={handleShow}>Add Document</button>
        </div>
       

        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Document</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Title</Form.Label>
            <Form.Control type="text" placeholder="Enter the title of the document.." onChange={(e)=>setDocumentTitle(e.target.value)}/>
          </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={createDocument}>
            Save
          </Button>
        </Modal.Footer>
        <ToastContainer position='top-center' theme='colored' autoClose='2000'/>
      </Modal>
     </div>
     </>
  )
}

export default UserMainPage
