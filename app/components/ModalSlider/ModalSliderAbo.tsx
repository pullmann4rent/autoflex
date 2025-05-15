
import Slider from "react-slick";
import { AiOutlineClose } from 'react-icons/ai';
import { Form, useNavigation } from "@remix-run/react";
import Modal from "~/utils/Modal";
import Lion from '../../../assets/lion.png';
import { useEffect, useRef, useState } from 'react';
import { IModalSlider } from './types';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { TfiArrowLeft, TfiArrowRight } from 'react-icons/tfi';
import { RiCloseLargeLine } from 'react-icons/ri';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function ModalSliderAbo({
  images,
  cover,
  onPressClose,
  init
}: IModalSlider) {

  const ref = useRef();

  var settings = {
    initialSlide: init,
  }

  return (
    <Modal className='modal-slider-abo' onClose={onPressClose}>
      {
        Slider && (
          <section className="relative">
            <button type="button" className="close-modal-btn" onClick={onPressClose}>
              <RiCloseLargeLine size={20} color="#fff" />
            </button>
            <button className="prev pv2" onClick={() => ref?.current?.slickPrev()}><TfiArrowLeft size={24} color="#fff" /></button>
            <Slider {...settings} ref={ref}>
                <div>
                  <img src={cover} alt="car" />
                </div>
                 { images.map((el => (
                    <div>
                      <img src={el} alt="Image" />
                    </div>
                  )))
                 }
            </Slider>
            <button className="next nx2" onClick={() => ref?.current?.slickNext()}><TfiArrowRight size={24} color="#fff" /></button>
          </section>
        )
      }
    </Modal>
  )
}