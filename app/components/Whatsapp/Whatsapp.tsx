import { AiFillCloseCircle } from 'react-icons/ai';
import { FaWhatsapp } from 'react-icons/fa';
import { useState } from 'react';
import User from '~/assets/user.jpeg';

export default function Whatsapp({
  className
}: { className?: string; }) {
  const [show, setShow] = useState<boolean>(true);
  return (
    <section className="support-container">
      <a className={className ?? 'whatsapp'} aria-label="Chat on WhatsApp" href="https://wa.me/491782498927"> <FaWhatsapp color="#fff" size={24} /> </a>
    </section>
  )
}