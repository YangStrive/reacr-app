import Form from './components/form';

const Antd3Form = (props) => {
  let {
    getFieldDecorator,
  } = props;
  return (
    <form>
      <div>
        <label>姓名：</label>
        {getFieldDecorator('name', {
          rules: [{ required: true, message: '请输入姓名' }]
        })(<input type="text" />)}
      </div>

      <div>
        <label>年龄：</label>
        {getFieldDecorator('age', {
          rules: [{ required: true, message: '请输入年龄' }]
        })(<input type="text" />)}
      </div>
      <button type="button" onClick={() => {
        props.vaildateFields((err, values) => {
          if(err){
            console.log(err)
          }else{
            console.log(values)
          }
        })
      }
      }>提交</button>
    </form>
  )
}

export default Form(Antd3Form)