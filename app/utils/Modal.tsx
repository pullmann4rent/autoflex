import { useSpring, animated, config, useTransition } from "@react-spring/web";
import { IModal } from "./types";

export default function Modal({ children, onClose, className }: IModal) {
  const transition = useTransition(true, {
    from: {
      scale: 0,
      opacity: 0,
    },
    enter: {
      scale: 1,
      opacity: 1,
    },
    leave: {
      scale: 0,
      opacity: 0,
    },
  });
  return (
    <animated.section className="modal">
       <div className="modal-close" onClick={onClose} />
      { transition((style, isOpen) => (
        <animated.section style={style} onClick={(event) => event.stopPropagation()} className={`modal-content ${className}`}>
          { children }
        </animated.section>
      ))
      }
    </animated.section>
  )
};