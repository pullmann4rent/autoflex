import { useField } from "remix-validated-form";

type MyInputProps = {
  name: string;
  className?: string;
};

export const MySelect = ({ name, className, ...props }: MyInputProps & React.HTMLProps<HTMLSelectElement>) => {
  const { error, getInputProps } = useField(name);
  return (
    <div>
      <select className={`${className} ${error && 'border-red'}`} {...getInputProps({ id: name })} {...props}>
        <option value="Einzelunternehmen">Einzelunternehmen</option>
        <option value="Gesellschaft bürgerlichen Rechts GbR">Gesellschaft bürgerlichen Rechts GbR</option>
        <option value="Eingetragener  Kaufmann (e.K)">Eingetragener  Kaufmann (e.K)</option>
        <option value="UG (Haftungsbeschränkt)">UG (Haftungsbeschränkt)</option>
        <option value="Offene Handelsgesellschaft (OHG)">Offene Handelsgesellschaft (OHG)</option>
        <option value="Kommanditgesellschaft (KG)">Kommanditgesellschaft (KG)</option>
        <option value="Gesellschaft mit beschränkter Haftung (GmbH)">Gesellschaft mit beschränkter Haftung (GmbH)</option>
        <option value="Aktiengesellschaft (AG)">Aktiengesellschaft (AG)</option>
        <option value="GmbH & Co. KG">GmbH & Co. KG</option>
      </select>
      {error && <p className="my-error-class">{error}</p>}
    </div>
  );
};