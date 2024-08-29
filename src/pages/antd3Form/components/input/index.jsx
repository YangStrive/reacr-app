import './index.css';

const Input = (props) => {
 return (
  <div className="input-main">
    <div className="input-box">
      <input {...props}/>
    </div>
    {props.error && <div className="input-error">
      <span>{props.error}</span>
    </div>
    }
  </div>
 )
}

export default Input;