import { useField } from "remix-validated-form";

type MyInputProps = {
  name: string;
  className?: string;
};

export const MySelect2 = ({ name, className, children, ...props }: MyInputProps & React.HTMLProps<HTMLSelectElement>) => {
  const { error, getInputProps } = useField(name);
  return (
    <div>
      <select name="car" className={`${className} ${error && 'border-red'}`} {...getInputProps({ id: name })} {...props}>
        { children }
      </select>
      {error && <p className="my-error-class">{error}</p>}
    </div>
  );
};