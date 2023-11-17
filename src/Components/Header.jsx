import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <Navbar expand="lg" className="bg-primary">
      <Container>
        <Navbar.Brand><Link style={{textDecoration:'none'}} className='text-light ms-3' to={'/'}>Doc Up
        <span className='ms-2'><i class="fa-solid fa-file" style={{color:'white'}}></i></span></Link></Navbar.Brand>
      </Container>
    </Navbar>
  )
}

export default Header
