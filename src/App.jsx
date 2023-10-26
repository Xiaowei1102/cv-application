import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  //const [count, setCount] = useState(0)
  // const initialInfo = {
  //   firstName: '',
  //   lastName: '',
  //   email: '',
  //   phone: '',
  //   schoolName: '',
  //   major: '',
  //   dateOfStudy: '',
  //   companyName: '',
  //   title: '',
  //   responsibility: '',
  //   dateOfWork: ''
  // }
  const initialInfo = [
    [{
      id: 0,
      firstName: 'h',
      lastName: 'l',
      email: '',
      phone: ''
    }],
    [{
      id: 1,
      schoolName: 'U of M',
      major: 'Physics',
      dateOfStudy: '2009-2016'
    }],
    [{
      id: 2,
      companyName: 'Facebook',
      title: 'CEO',
      responsibility: 'Make money',
      dateOfWork: '2017-today'
    }]

  ]
  const [userInfo, setUserInfo] = useState(initialInfo);

  function changeInput(array, event) {
    //Need to return a new Array, can not modify the original one!!!
    //DEEP copy of the array
    const newArray = JSON.parse(JSON.stringify(array));
    for (let i in newArray) {
      for (let j in newArray[i]) {
        //initially used event.target.name to match which field is edited, which is fine but only for one school or work place
        //so maybe use id to identify, but id is not regestered with input(none of its attribute has id input), so need to use parent element's key
        //but key is only for react internal use only...so html element dont have it, need to define one...
        if(newArray[i][j].id === Number(event.target.parentElement.id)) {
          newArray[i][j][event.target.name] = event.target.value;
        }
      }
    }
    return newArray;
  }

  function handleChange(e){

    setUserInfo(
    //   userInfo.map{item =>{

    // }
    //   ...userInfo,
    //   [e.target.name]: e.target.value 
    // }
    changeInput(userInfo, e)
    )
  }
  console.log(userInfo);

  function handleSubmit(e) {
    //do nothing but hide the forms...
    
  }

  function addItemToArray(array, event) {
    const newId = array[0].length + array[1].length + array[2].length;
    const newArray = JSON.parse(JSON.stringify(array));
    if (event.target.className.includes('education')) {
      newArray[1].push({
        id: newId,
        schoolName: '',
        major: '',
        dateOfStudy: ''
      })
    } else {
      newArray[2].push({
        id: newId,
        companyName: '',
        title: '',
        responsibility: '',
        dateOfWork: ''
      })
    }
    return newArray;
  }

  function handleAdd(e) {
    setUserInfo(addItemToArray(userInfo, e))
  }

  return (
    <>
      <div className='form'>
        <div className = "personalContainer">
          <div className='personalTitle'>Personal Information</div>
          <PersonalInformationForm  handleChange = {handleChange}/>
        </div>
        <div className='eductionContainer'>
          <div className='educationAndButton'>
            <div className='educationTitle'>Education</div>
            <button className='educationButton' onClick={handleAdd}>+</button>
          </div>
            {userInfo[1].map(item => (
              <EducationForm education={item} handleChange={handleChange} />
            ))}
        </div>
        <div className='workContainer'>
          <div className='workAndButton'>
            <div className='workTitle'>Experience</div>
            <button className='workButton' onClick={handleAdd}>+</button>
          </div>
          {userInfo[2].map(item => (
              <WorkForm work={item} handleChange={handleChange} />
            ))}
        </div> 
        <button onSubmit={handleSubmit}>Submit</button> 
      </div>
      <div className='returnedCv'>
        <GenerateCv userInfo={userInfo} />
      </div> 
    </>
  )
}

function PersonalInformationForm({handleChange}){
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

function EducationForm({education, handleChange}) {
  return(
    <form action="./page" id={education.id} key={education.id}>
      <label >School Name</label>
      <input type="text" name='schoolName' value={education.schoolName} onChange={handleChange}/>
      <label >Major</label>
      <input type="text" name='major' value={education.major} onChange={handleChange}/>
      <label >Date of Study</label>
      <input type="text" name='dateOfStudy' value={education.dateOfStudy} onChange={handleChange}/>
    </form>
  )
}

function WorkForm({work, handleChange}) {
  return (
    <form action="./page" id={work.id} key={work.id}>
      <label>Company Name</label>
      <input type="text" name='companyName' value={work.companyName} onChange={handleChange}/>
      <label>Title</label>
      <input type="text" name='title' value={work.title} onChange={handleChange}/>
      <label>Role Responsibility</label>
      <input type="text" name='responsibility' value={work.responsibility} onChange={handleChange}/>
      <label>Start-End Date</label>
      <input type="text" name='dateOfWork' value={work.dateOfWork} onChange={handleChange}/>

    </form>
  )
}

function GenerateCv({userInfo}){
  return (
    <>
      <div className='cvPersonalContainer' >
        
        <div className='name'>{`${userInfo[0][0].firstName} ${userInfo[0][0].lastName}`}</div>
        <div className='cvPersonalInfo'>
          <div className='cvEmail'>{userInfo[0][0].email}</div>
          <div className='cvPhone'>{userInfo[0][0].phone}</div>
        </div>
      </div>
      <div className='cvEducationContainer'>
        <div className='cvEducationPart'>Education</div>
        {/* <div>{userInfo[1][0].dateOfStudy}</div> */}
        {userInfo[1].map(item => (
                <Education {...item} />
              ))}
      </div>
      <div className='cvWorkContainer'>
        <div className='cvWorkPart'>Work Experience</div>
        {userInfo[2].map(item => (
                <Work {...item} />
              ))}
      </div>
    </>
  )
}

function Education(education) {
  return (
  <div className='cvEducation' key={education.id}>
    <div className='cvDateOfStudy'>{education.dateOfStudy}</div>
      <div className='cvEducationDetail'>
        <div className='cvSchooName'>{education.schoolName}</div>
        <div className='cvSchoolMajor'>{education.major}</div>
      </div>
  </div>
  )
}

function Work(work) {
  return (
    <div className='cvWork' key={work.id}>
    <div className='cvDateofWork'>{work.dateOfWork}</div>
    <div className='cvWorkDetail'>
      <div className='cvCompanyName'>{work.companyName}</div>
      <div className='cvWorkTitle'>{work.title}</div>
      <div className='cvWorkResponsibility'>{work.responsibility}</div>
    </div>
  </div>
  )
}

export default App
