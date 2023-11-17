import './App.css';
import { Route, Routes } from 'react-router-dom';
import UserMainPage from './Pages/UserMainPage';
import DocumentTextPage from './Pages/DocumentTextPage';
import Header from './Components/Header'
import Footer from './Components/Footer'

function App() {
  
  return (
    <>
     <Header/>
      <div>
        <Routes>
          <Route path='/' element={<UserMainPage/>}></Route>
          <Route path='/updatedocument/:id' element={<DocumentTextPage/>}></Route>
        </Routes>
      </div>
     <Footer/>

    </>
  );
}

export default App;
