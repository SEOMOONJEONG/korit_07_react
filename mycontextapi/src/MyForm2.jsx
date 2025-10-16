import { useState } from "react";

function MyForm2() {
  const [ text, setText ] = useState('');

  // input field에 입력한 것을 submit하면 날려보낼 수 있도록 하는 함수를 작성(input 작성 시 이 부분은 거의 고정이라고 봐도 무방함.)
  const handleChange = (event) => {
    setText(event.target.value);  // 계속해서 덮어써짐. 그래서 하나하나 다 표시됨.
    console.log(text);
  }

  const handleSubmit = (event) => {
    alert(`'${text}' 라고 입력하셨습니다.`);
    event.preventDefault();
  }

  return(
    <form onSubmit={handleSubmit}>
      <input type="text" onChange={handleChange} value={text}/>
      <br />
      <br />
      <input type="submit" value='클릭하세요 😊' />
    </form>
  );
}

export default MyForm2