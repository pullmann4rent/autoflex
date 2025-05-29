import RemoveButton from "../RemoveButton/RemoveButton";

export interface Iimage {
  imgUrl: string;
  onPressRemove?: (imgUrl: string) => void;
}

export default function ImagePreview({
  imgUrl,
  onPressRemove
}: Iimage) {
  return (
    <button type="button" className="relative">
      <img src={imgUrl} alt="Car" />
      { onPressRemove &&
        <RemoveButton 
          onPress={() => onPressRemove(imgUrl)}
        />
      }
    </button>
  )
}