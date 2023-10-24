import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  //const [count, setCount] = useState(0)
  const initialInfo = {
    firstName: '',
    lastName: '',

  }
  function handleChange(){

  }

  return (
    <>
    <div className = "personalContainer">
      <div className='personalTitle'>Personal Information</div>
      <PersonalInformation handleChange = {handleChange}/>
    </div>
    <div className='eductionContainer'>
      <div className='educationTitle'>Education</div>
      <Education handleChange={handleChange} />
    </div>
    <div className='workContainer'>
      <div className='workTitle'>Experience</div>
      <Work handleChange={handleChange} />
    </div>   
      
    </>
  )
}

function PersonalInformation({handleChange}){
  return (
    <form action="./page" >
      <label htmlFor="firstname">First Name</label>
      <input type="text" name="firstname" onChange={handleChange} />
      <label htmlFor="lastname">Last Name</label>
      <input type="text" name="lastname" onChange={handleChange} />
      <label htmlFor="email">Email</label>
      <input type="email" name="email" onChange={handleChange} />
      <label htmlFor="phone">Telephone</label>
      <input type="tel" name="phone" onChange={handleChange} />
    </form>
  )
}

function Education({handleChange}) {
  return(
    <form action="./page">
      <label htmlFor="schoolname">School Name</label>
      <input type="text" name='schoolname' onChange={handleChange}/>
      <label htmlFor="major">Major</label>
      <input type="text" name='major' onChange={handleChange}/>
      <label htmlFor="dateOfStudy">Date of Study</label>
      <input type="text" name='dateOfStudy' onChange={handleChange}/>
    </form>
  )
}

function Work({handleChange}) {
  return (
    <form action="./page">
      <label>Company Name</label>
      <input type="text" name='companyName' onChange={handleChange}/>
      <label>Title</label>
      <input type="text" name='title' onChange={handleChange}/>
      <label>Role Responsibility</label>
      <input type="text" name='responsibility' onChange={handleChange}/>
      <label>Start Date</label>
      <input type="text" name='startDate' onChange={handleChange}/>
      <label>End Date</label>
      <input type="text" name='endDate' onChange={handleChange}/>
    </form>
  )
}

export default App
