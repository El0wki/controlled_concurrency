type ButtonProps = {
  label?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ label, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className="cursor-pointer hover:scale-105 duration-300 hover:bg-gray-500 p-1 rounded-lg border-gray-600 border-1 bg-gray-300">
      {label ?? label}
    </button>
  );
};

export default Button;
