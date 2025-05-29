import { useField } from "remix-validated-form";

type MyInputProps = {
  name: string;
  className?: string;
};

export const MyInput = ({ name, className, ...props }: MyInputProps & React.HTMLProps<HTMLInputElement>) => {
  const { error, getInputProps } = useField(name);
  return (
    <div>
      <input className={`${className} ${error && 'border-red'}`} {...getInputProps({ id: name })} {...props} />
      {error && <p className="my-error-class">{error}</p>}
    </div>
  );
};