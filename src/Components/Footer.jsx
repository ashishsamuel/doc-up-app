import React from 'react'
import { Link } from 'react-router-dom'
import './Footer.css'

function Footer() {
  return (
    <div className='d-flex justify-content-center align-items-center flex-column bg-primary text-light mt-5 flex-wrap' style={{width:'100%',height:'350px'}}>
      <div className='footer-content d-flex justify-content-evenly w-100 flex-wrap'>
        <div className='website d-flex flex-column margin-style'>
        <h4>Doc Up<span className='ms-2'><i class="fa-solid fa-file" style={{color:'white'}}></i></span></h4>
<h6>
    Designed and built with all the love in the world by the Doc Up team with the help of our contributors.</h6>
    <h6>Code licensed Media, docs CC BY 3.0.</h6>
<h6>Currently v1.0.0.</h6>
        </div>
        <div className='guides d-flex flex-column'>
        <h4>Guides</h4>
            <Link to={'https://firebase.google.com/docs/build'} style={{textDecoration:'none',color:'white'}}>Firebase</Link>
            <Link to={'https://react-bootstrap.github.io/'} style={{textDecoration:'none',color:'white'}}>React Bootstrap</Link>
            <Link to={'https://reactrouter.com/en/main'} style={{textDecoration:'none',color:'white'}}>Routing</Link>
        </div>
        <div className='contact d-flex flex-column'>
            <h4>Contact Us</h4>
            <div>

            </div>
            <div>
            <Link to={'/'} className='mx-2' style={{textDecoration:'none',color:'white'}}><i class="fa-brands fa-linkedin" style={{color: 'white'}}></i></Link>
            <Link to={'/'} className='mx-3' style={{textDecoration:'none',color:'white'}}>
            <i class="fa-brands fa-twitter" style={{textDecoration:'none',color:'white'}}></i></Link>
            <Link to={'/'} className='mx-3' style={{textDecoration:'none',color:'white'}}><i class="fa-brands fa-facebook-f" style={{textDecoration:'none',color:'white'}}></i></Link>
            <Link to={'/'} className='mx-2' style={{textDecoration:'none',color:'white'}}><i class="fa-regular fa-envelope" style={{textDecoration:'none',color:'white'}}></i></Link>
            
            </div>
        </div>

      </div>
      <p className='mt-5'>Copyright © 2023 Doc Up. Built with React.</p>
    </div>
  )
}

export default Footer
