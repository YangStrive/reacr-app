
import FieldContext from '../../fieldContext';

const Form = ({children, form, onFinish}) =>{
  form.setCallback({
    onFinish
  });
  return (
    <form onSubmit={ (ev) => {
      ev.preventDefault();
      form.submit();
    }}>
      <FieldContext.Provider value={form}>
        {children}
      </FieldContext.Provider>
    </form>
  )
}

export default Form;