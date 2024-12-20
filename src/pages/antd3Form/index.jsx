import Form from './components/form';
import Input from './components/input';
import './index.css';

const Antd3Form = (props) => {
  // TODO: 通过props获取getFieldDecorator等方法
  // !: getFieldDecorator等方法是通过props传递进来的，但是在组件内部并没有使用，导致组件无法正常工作
  // ?: 在组件内部使用getFieldDecorator等方法
  // NOTE: 在组件内部使用getFieldDecorator等方法
  // BUG: 在组件内部使用getFieldDecorator等方法
  // bug: 在组件内部使用getFieldDecorator等方法
  // todo: 在组件内部使用getFieldDecorator等方法
  

  // 
  let {
    getFieldDecorator,
  } = props;
  return (
    <form>
      <div className='form-item'>
        <label>姓名：</label>
        {getFieldDecorator('name', {
          rules: [{ required: true, message: '请输入姓名' }]
        })(<Input type="text" />)}
      </div>

      <div className='form-item'>
        <label>年龄：</label>
        {getFieldDecorator('age', {
          rules: [{ required: true, message: '请输入年龄' }]
        })(<Input type="text" />)}
      </div>
      <div className='form-item'>
        <button type="button" onClick={() => {
          console.log(props.getFieldValues())
          console.log(props.getFieldValue('name'))
        }
        }>获取值</button>
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
        <button type="button" onClick={() => {
          props.resetFields()
        }
        }>重置</button>
        <button type="button" onClick={() => {
          props.setFieldsValues({name: '张三', age: 18})
        }
        }>设置值</button>
      </div>
    </form>
  )
}

export default Form(Antd3Form)