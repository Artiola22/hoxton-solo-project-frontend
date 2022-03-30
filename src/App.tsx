import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'

import './App.css'
import Header from './Components/Headers'
import Modals from './Components/Modals/Modals'
import NavBar from './Components/NavBar'
import Messages from './Pages/Messages'
import MyContacts from './Pages/MyContact'
import PageNotFound from './Pages/PageNotFound'
import Status from './Pages/Status'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Header />
     <Modals />
     <NavBar />
     <Routes>
       <Route  path='/messages' element={<Messages />}/>
       <Route path='/my-contacts' element={<MyContacts />}/>
       <Route path='/status' element={<Status />}/>
       <Route path='*' element={<PageNotFound />}/>
     </Routes>
     
    </div>
  )
}

export default App
