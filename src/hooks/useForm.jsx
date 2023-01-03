import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Joi from "joi-browser";

const useForm = (initialState, schema, data, setData, selectItem) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (selectItem) setValues(selectItem);
  }, [selectItem]);

  const validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const inputSchema = { [name]: schema[name] };
    const { error } = Joi.validate(obj, inputSchema);
    return error ? error.details[0].message : null;
  };

  const handleInput = (e) => {
    const newErrors = { ...errors };
    const errorMessage = validateProperty(e.target);
    if (errorMessage) newErrors[e.target.name] = errorMessage;
    else delete newErrors[e.target.name];

    const newValues = { ...values };
    newValues[e.target.name] = e.target.value;
    setValues(newValues);
    setErrors(newErrors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (Object.keys(errors).length > 0) {
      toast.error("All Fields Required", { theme: "colored" });
      return;
    }

    if (values.id) {
      const index = data.findIndex((d) => d.id === values.id);
      const newData = [...data];
      newData[index] = values;
      setData(newData);
      toast.success("client update success", { theme: "colored" });
    } else {
      const newValues = { ...values };
      const id = data[data.length - 1].id + 1 || 1;
      newValues.id = id;
      setData([newValues, ...data]);
      toast.success("client added success", { theme: "colored" });
    }
    setValues(initialState);
  };

  const renderInput = (label, name, value, type = "text") => {
    return (
      <div class="mb-3">
        <label for={name} class="form-label">
          {label}
        </label>
        <input
          type={type}
          className={
            errors[name]
              ? "form-control is-invalid"
              : (value === "" && "form-control") || "form-control is-valid"
          }
          id={name}
          name={name}
          value={value}
          onChange={handleInput}
        />
        <div class="valid-feedback">Looks good!</div>
        <div id="validationServerUsernameFeedback" class="invalid-feedback">
          {errors[name] && errors[name]}
        </div>
      </div>
    );
  };

  const renderButton = (label) => {
    return (
      <button
        type="submit"
        className="btn btn-primary"
        disabled={Object.keys(errors).length > 0}
      >
        {label}
      </button>
    );
  };

  return {
    values,
    handleInput,
    handleSubmit,
    renderInput,
    renderButton,
  };
};

export default useForm;
