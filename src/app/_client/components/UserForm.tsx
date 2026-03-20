type UserFormProps = {
  formBtn?: any;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
} & React.InputHTMLAttributes<HTMLInputElement>;

const UserForm = ({ formBtn, inputProps, ...props }: UserFormProps) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}>
      <label htmlFor="userid">UserId: </label>
      <input {...inputProps} />
      {formBtn ? formBtn : <button>Enviar</button>}{" "}
    </form>
  );
};

export default UserForm;
