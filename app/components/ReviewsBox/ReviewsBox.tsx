import { MdStarRate } from "react-icons/md";
import { IReviewsBox } from "./types";

export function ReviewsBox({
  name,
  text
}: IReviewsBox) {
  return (
    <section className="review">
      <section className="r-header">
        <MdStarRate color="orange" className="star" size={20} />
        <MdStarRate color="orange" className="star" size={20} />
        <MdStarRate color="orange" className="star" size={20} />
        <MdStarRate color="orange" className="star" size={20} />
        <MdStarRate color="orange" className="star" size={20} />
      </section>

      <p className="r-text">
        {text}
      </p>

      <section className="flex ai-c r-footer">
        <span>{name}</span>
        <span className="r-line">-</span>
        <span className="r-round">Gewerbekunde</span>
      </section>
    </section>
  )
}