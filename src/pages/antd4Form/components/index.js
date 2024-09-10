import _Form from './form';
import Input from './input';
import Filed from './filed';
import UseForm from './useForm';

let Form = _Form;
Form.useForm = UseForm;
Form.Filed = Filed;

export {
  Form,
  Input,
  Filed,
  UseForm
}

export default Form;