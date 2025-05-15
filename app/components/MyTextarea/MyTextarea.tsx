import { useField } from "remix-validated-form";

type MyInputProps = {
  name: string;
  className?: string;
};

export const MyTextArea = ({ name, className, ...props }: MyInputProps & React.HTMLProps<HTMLTextAreaElement>) => {
  const { error, getInputProps } = useField(name);
  return (
    <div>
      <textarea className={`${className} ${error && 'border-red'}`} {...getInputProps({ id: name })} {...props} />
      {error && <p className="my-error-class">{error}</p>}
    </div>
  );
};