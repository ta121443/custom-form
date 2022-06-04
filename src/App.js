import { useState } from 'react';
import './App.css';


function App() {
  const initialValues = {username: "", email: "", password: ""};
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({}); //オブジェクトにすると，keyと値を格納できる
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({...formValues, [name]: value});
    console.log(formValues);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  const validate = (values) => {
    const errors = {};
    const regex = /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/;


    if(!values.username) {
      errors.username = "ユーザー名を入力してください";
    }
    if(!values.email) {
      errors.email = "メールアドレスを入力してください";
    } else if(!regex.test(values.email)) {
      errors.email = "正しいメールアドレスを入力してください";
    }
    if(!values.password) {
      errors.password = "パスワードを入力してください";
    } else if(values.password.length < 4) {
      errors.password = "4文字以上15文字以下のパスワードを入力してください";
    } else if(values.password.length > 15) {
      errors.password = "4文字以上15文字以下のパスワードを入力してください";
    }

    return errors;
  };


  return (
    <div className="formContainer">
      <form onSubmit={(e) => handleSubmit(e)}>
        <h1>ログインフォーム</h1>
        <hr />
        <div className='uiForm'>
          <div className='formField'>
            <label>ユーザー名</label>
            <input 
              type="text" 
              placeholder='ユーザー名' 
              name='username' 
              onChange={(e) => handleChange(e)} 
            />
          </div>
          <p className='errorMsg'>{formErrors.username}</p>
          <div className='formField'>
            <label>メールアドレス</label>
            <input 
              type="text" 
              placeholder='メールアドレス' 
              name='email' 
              onChange={(e) => handleChange(e)}
            />
          </div>
          <p className='errorMsg'>{formErrors.email}</p>
          <div className='formField'>
            <label>パスワード</label>
            <input 
              type="text" 
              placeholder='パスワード' 
              name='password' 
              onChange={(e) => handleChange(e)}
            />
          </div>
          <p className='errorMsg'>{formErrors.password}</p>
          <button className='submitButton'>ログイン</button>
          {Object.keys(formErrors).length === 0 && isSubmit && (
            <div className='msgOk'>ログインに成功しました</div>
          )}
        </div>
      </form>
    </div>
  );
}

export default App;
