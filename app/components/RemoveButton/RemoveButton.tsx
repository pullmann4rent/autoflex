import { AiFillCloseCircle } from 'react-icons/ai';

export interface IRemoveButton {
  onPress: () => void;
}

export default function RemoveButton({
  onPress
}: IRemoveButton) {
  return (
    <button type="button" onClick={onPress}>
      <AiFillCloseCircle size={16} color="red" className="remove-icon" />
    </button>
  )
};