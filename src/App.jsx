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
  //this lastId refers to the id if you add an object to the current userInfo
  const [lastId, setLastId] = useState(3);

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

  function handleSubmit() {
    //do nothing but hide the forms...
    const forms = document.getElementsByTagName('form')
    //forms is a nodeList, do not have array method; need to convert to array first

    Array.from(forms).forEach(form => {
      if(form.parentElement.className !== "personalContainer") {
        form.style.display = "none";
      }
    })

  }

  function handleEdit(e) {
    //simply display the forms in this section
    let forms;
    if(e.target.className.includes('education')) {
      forms = document.querySelectorAll(".educationContainer>form")
      forms.forEach(form => {
        form.style.display = "flex";
      })
    } else {
      forms = document.querySelectorAll(".workContainer>form")
      forms.forEach(form => {
        form.style.display = "flex";
      })

    }
  }


  function addItemToArray(newId, array, event) {
    //below will cause id colision once you delete an item and add a new item..
    //const newId = array[0].length + array[1].length + array[2].length;
    //therefore, just make sure the id always goes up, and can not use global variable bcz it will rerender..
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
    //have react update this number for next rerendering
    setLastId(lastId + 1)
    setUserInfo(addItemToArray(lastId, userInfo, e))
  }

  function deleteItemFromArray(array, event) {
    const newArray = JSON.parse(JSON.stringify(array));
    let index;
    for (let i in newArray) {
      for (let j in newArray[i]) {
        if(newArray[i][j].id === Number(event.target.parentElement.id)) {
          newArray[i].splice(j, 1);
          return newArray;
        }
      }
    }
    //if not found
    return newArray;
  }

  function handleDelete(e) {
    setUserInfo(deleteItemFromArray(userInfo, e))
  }

  return (
    <>
      <div className='form'>
        <div className = "personalContainer">
          <div className='personalTitle'>Personal Information</div>
          <PersonalInformationForm  handleChange = {handleChange}/>
        </div>
        {/* another  mis-spell ugh */}
        <div className='educationContainer'>
          <div className='educationAndButton'>
            <div className='educationTitle'>Education</div>
            <button className='educationButton' onClick={handleAdd}>+</button>
            <button className='educationEditButton' onClick={handleEdit}>Edit</button>
          </div>
            {userInfo[1].map(item => (
              <EducationForm education={item} handleChange={handleChange} handleDelete={handleDelete}/>
            ))}
        </div>
        <div className='workContainer'>
          <div className='workAndButton'>
            <div className='workTitle'>Experience</div>
            <button className='workButton' onClick={handleAdd}>+</button>
            <button className='workEditButton' onClick={handleEdit}>Edit</button>
          </div>
          {userInfo[2].map(item => (
              <WorkForm work={item} handleChange={handleChange} handleDelete={handleDelete}/>
            ))}
        </div> 
        {/* can not use onSubmit bcz there is no form, need to use onClick */}
        <button onClick={handleSubmit}>Submit</button> 
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

function EducationForm({education, handleChange, handleDelete}) {
  return(
    <form action="./page" id={education.id} key={education.id}>
      <label >School Name</label>
      <input type="text" name='schoolName' value={education.schoolName} onChange={handleChange}/>
      <label >Major</label>
      <input type="text" name='major' value={education.major} onChange={handleChange}/>
      <label >Date of Study</label>
      <input type="text" name='dateOfStudy' value={education.dateOfStudy} onChange={handleChange}/>
      <button className='delete' onClick={handleDelete}>Delete</button>
    </form>
  )
}

function WorkForm({work, handleChange, handleDelete}) {
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
      <button className='delete' onClick={handleDelete}>Delete</button>
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
