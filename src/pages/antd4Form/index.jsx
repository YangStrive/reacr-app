import Form, {Input, UseForm, Filed } from "./components";

const Andtd4Form = () => {
  const [form] = UseForm();
  return (
    <div>
      <Form form={form} onFinish={ (e) => {
        console.log(form.getFieldsValue());
      }}>
        <Filed 
          label="username" 
          name="name"
          rules={[
            {required: true, message: 'please input your name'}
          ]}
          >
          <Input 
            onChange= { () => {
              console.log('change')
            }}
            onBlur= { () => {
              console.log('blur')
            }}
          />
        </Filed>
        <Filed label="password" name="password">
          <Input />
        </Filed>
        <button>submit</button>
        <button onClick={ (e) => {
          e.preventDefault();
          form.setFieldsValue({
            name: 'name',
            password: 'new password'
          });
        }}>改变值</button>
        <button onClick={ (e) => {
          e.preventDefault();
          form.validate();
        }
        }>校验</button>
      </Form>
    </div>
  )

}

export default Andtd4Form;