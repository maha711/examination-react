import useForm from "../hooks/useForm";
import Joi from "joi-browser";

const schema = {
  first_name: Joi.string().min(4).max(9).required().label("first_name"),
  last_name: Joi.string().min(4).max(9).required().label("last_name"),
  email: Joi.string().required(),
  gender: Joi.string(),
};

const ClientForm = ({ data, setData, selectItem }) => {
  const initialState = {
    id: null,
    first_name: "",
    last_name: "",
    email: "",
    gender: "",
  };
  const { values, renderInput, renderButton, handleSubmit } = useForm(
    initialState,
    schema,
    data,
    setData,
    selectItem
  );

  return (
    <form onSubmit={handleSubmit}>
      {renderInput(" first_name", "first_name", values.first_name)}
      {renderInput("last_name", "last_name", values.last_name)}
      {renderInput("email", "email", values.email)}
      {renderInput("gender", "gender", values.gender)}
      {renderButton("Submit")}
    </form>
  );
};

export default ClientForm;
