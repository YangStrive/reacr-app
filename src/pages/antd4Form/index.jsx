import Form, {Input, UseForm, Filed } from "./components";

const Andtd4Form = () => {
  const [form] = UseForm();
  console.log(form);
  return (
    <div>
      <Form form={form} onFinish={ (e) => {
        console.log(form.getFieldsValue());
      }}>
        <Filed label="username" name="name">
          <Input />
        </Filed>
        <Filed label="password" name="password">
          <Input />
        </Filed>
        <button>submit</button>
      </Form>
    </div>
  )

}

export default Andtd4Form;