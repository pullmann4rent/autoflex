import { useFormContext, useIsSubmitting } from "remix-validated-form";

export const MySubmitButton = () => {
  const isSubmitting = useIsSubmitting();
  const { isValid } = useFormContext();
  const disabled = isSubmitting || !isValid;

  return (
    <button
      type="submit"
      disabled={disabled}
      className={disabled ? "disabled-btn price-next" : "btn price-next"}
    >
      {isSubmitting ? "Ladet..." : "Weiter"}
    </button>
  );
};