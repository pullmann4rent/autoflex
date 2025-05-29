import Slider from "react-slick";
import { AiOutlineClose } from "react-icons/ai";
import { useRef, useState } from "react";
import { BsDot, BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from "react-icons/bs";
import { MdOutlineArrowBackIos, MdOutlineArrowForwardIos } from "react-icons/md";
import Modal from "~/utils/Modal";


export interface IModalSlider {
  image: string;
  images: string[];
  init: number;
  video: string | null;
  conditions?: string;
  onPressClose: () => void;
}

export default function ModalSlider({
  image,
  images,
  video,
  init,
  conditions,
  onPressClose
}: IModalSlider) {
  const ref = useRef<Slider>(null);
  const [sl, setSL] = useState<number>(0);
  const settings = {
    dots: true,
    infinite: true,
    arrows: false,
    initialSlide: init,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (prev, next) => {
      setSL(next)
    },
    customPaging: (pagi, i) => {
      return (
        <BsDot size={20} color={pagi === sl ? 'black' : 'grey'} />
      )
    }
  };
  return (
    <Modal className="w-max-800 pdd" onClose={onPressClose}>
      <section className="flex jb modal-info">
        <h2>Bilder</h2>
        <button type="button" onClick={onPressClose}>
          <AiOutlineClose size={24} color='#222' />
        </button>
      </section>
      <section className="w100 slider-ct">
        <section className="relative">
        <MdOutlineArrowBackIos size={32} color='#999' onClick={() => ref.current?.slickPrev()} className="dot-slider-left" />
          <Slider ref={ref} {...settings}>
              <section>
                <img src={image} alt="Auto" className="slider-img" />
              </section>
              {
                images.map((el, i) => (
                  <section key={i}>
                    <img src={el} alt="image" className="slider-img" />
                  </section>
                ))
              }  
            </Slider>  
          <MdOutlineArrowForwardIos size={32} color='#999' onClick={() => ref.current?.slickNext()} className="dot-slider-right" />
        </section>
      </section>
    </Modal>
  )
}