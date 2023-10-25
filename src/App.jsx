import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  //const [count, setCount] = useState(0)
  const initialInfo = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    schoolName: '',
    major: '',
    dateOfStudy: '',
    companyName: '',
    title: '',
    responsibility: '',
    dateOfWork: ''
  }
  const [userInfo, setUserInfo] = useState(initialInfo);

  function handleChange(e){
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value 
    })
  }

  function handleSubmit(e) {

  }

  return (
    <>
      <div className='form'>
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
        <button onSubmit={handleSubmit}>Submit</button> 
      </div>
      <div className='returnedCv'>
        <GenerateCv userInfo={userInfo} />
      </div> 
    </>
  )
}

function PersonalInformation({handleChange}){
  return (
    <form action="./page" >
      <label >First Name</label>
      <input type="text" name="firstName" onChange={handleChange} />
      <label >Last Name</label>
      <input type="text" name="lastName" onChange={handleChange} />
      <label >Email</label>
      <input type="email" name="email" onChange={handleChange} />
      <label >Telephone</label>
      <input type="tel" name="phone" onChange={handleChange} />
    </form>
  )
}

function Education({handleChange}) {
  return(
    <form action="./page">
      <label >School Name</label>
      <input type="text" name='schoolName' onChange={handleChange}/>
      <label >Major</label>
      <input type="text" name='major' onChange={handleChange}/>
      <label >Date of Study</label>
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
      <label>Start-End Date</label>
      <input type="text" name='dateOfWork' onChange={handleChange}/>

    </form>
  )
}

function GenerateCv({userInfo}){
  return (
    <>
      <div className='cvPersonalContainer' >
        <div className='name'>{`${userInfo.firstName} ${userInfo.lastName}`}</div>
        <div className='cvPersonalInfo'>
          <div className='cvEmail'>{userInfo.email}</div>
          <div className='cvPhone'>{userInfo.phone}</div>
        </div>
      </div>
    <div className='cvEducationContainer'>
      <div className='cvEducationPart'>Education</div>
      <div className='cvEducation'>
        <div className='cvDateOfStudy'>{userInfo.dateOfStudy}</div>
        <div className='cvEducationDetail'>
          <div className='cvSchoolTitle'>{userInfo.schoolName}</div>
          <div className='cvSchoolMajor'>{userInfo.major}</div>
        </div>
      </div>
    </div>
      <div className='cvWorkContainer'>
        <div className='cvWorkPart'>Work Experience</div>
        <div className='cvWork'>
          <div className='cvDateofWork'>{userInfo.dateOfWork}</div>
          <div className='cvWorkDetail'>
            <div className='cvCompanyName'>{userInfo.companyName}</div>
            <div className='cvWorkTitle'>{userInfo.title}</div>
            <div className='cvWorkResponsibility'>{userInfo.responsibility}</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
