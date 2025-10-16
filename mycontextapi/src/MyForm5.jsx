// 내가 쓴 답
import { useState } from "react"

function MyForm5() {
  const [ firstName, setFirstName ] = useState('');
  const [ lastName, setLastName ] = useState('');
  const [ email, setEmail ] = useState('');

  // 근데 잘 생각해보면 alert을 띄우는건 학습 상황이라허 그렇지 실제 얘가 하는 역할은 form 태그의 preventDefault()를 쓰기 위해서에 가깝습니다.
  const handleSubmit = (event) => {
    alert(`Hello, ${firstName.firstName} ${lastName.lastName}`); 
    event.preventDefault();
  }

  const handleChange = (event) => { // event.target.name 의 name = input 태그 내의 name
    setFirstName({...firstName, [event.target.name]: event.target.value});
    setLastName({...lastName, [event.target.name]: event.target.value});
    setEmail({...email, [event.target.name]: event.target.value});
  }

  return (  
    <form onSubmit={handleSubmit}>  
      <label>firstName : </label>
      <input type="text" name="firstName" onChange={handleChange} 
      value={firstName.firstName} />
      <br />
      <label>lastName : </label>
      <input type="text" name="lastName" onChange={handleChange} value={lastName.lastName} />
      <br />
      <label>email : </label>
      <input type="text" name="email" onChange={handleChange} value={email.email} /> 
      <br />
      <br />
      <input type="submit" value='제출 😄' />
    </form>
  )
}

export default MyForm5