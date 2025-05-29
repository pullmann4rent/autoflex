import { AiFillCloseCircle } from 'react-icons/ai';

export interface IRemoveButton {
  onPress: () => void;
  className?: string;
}

export default function RemoveIcon({
  onPress,
  className
}: IRemoveButton) {
  return (
    <button type="button" className={className} onClick={onPress}>
      <AiFillCloseCircle size={16} color="red" className="remove-icon" />
    </button>
  )
};