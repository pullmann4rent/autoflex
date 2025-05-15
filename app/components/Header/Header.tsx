import { Link, NavLink } from '@remix-run/react';
import Logo from '../../assets/logo_1.png';
import { BiSolidMessageRounded } from "react-icons/bi";
import { RiPhoneFill } from "react-icons/ri";
import { useState } from 'react';
import { MeetingRequest } from '../MeetingRequest/MeetingRequest';
import Hamburger from 'hamburger-react'
import { RxHamburgerMenu } from 'react-icons/rx';
import { IoCloseOutline } from 'react-icons/io5';

export function Header() {
  const [open, setOpen] = useState<boolean>(false);

  const [navOpen, setNavOpen] = useState<boolean>(false);
  return (
    <>
      <header role="banner" className="header w-100">
        <section className="container">
          <section className="flex ai-c jc-sb hd-ct">
            <section>
              <a href="/">
                <img src={Logo} alt="Image" />
              </a>
            </section>

            { open && 
              <MeetingRequest open={open} handleClose={() => setOpen(false)} />
            }

            <section>
              <section className="hamburger-container">
                { navOpen ? <IoCloseOutline onClick={() => setNavOpen(false)} size={32} color="#fff" /> : <RxHamburgerMenu onClick={() => setNavOpen(true)} size={32} color="#fff" /> }
              </section>
              <nav role="navigation" className={`header-nav mb-nav`}>
                <ul className="flex ai-c">
                  <li>
                    <a href="/">Home</a>
                  </li>
                  <li>
                    <a href="/cars">Fahrzeuge</a>
                  </li>
                  <li>
                    <a href="/contact">Kontakt</a>
                  </li>
                  <li>
                  <a href="/about_us">Über uns</a>
                  </li>
                  <li>
                    <a href="tel:+491782498927">
                      <RiPhoneFill 
                        size={20}
                        color="#fff"
                      />
                    </a>
                  </li>
                  <li>
                    <button onClick={() => setOpen(true)} type="button" className="termin-btn">
                      Termin Vereinbaren
                    </button>
                  </li>
                </ul>
              </nav>
            </section>



          </section>
          { navOpen &&
          <nav role="navigation" className={`header-nav mb-nav-2`}>
            <ul className="flex ai-c">
                  <li>
                    <a href="/">Home</a>
                  </li>
                  <li>
                    <a href="/cars">Fahrzeuge</a>
                  </li>
                  <li>
                    <a href="/fleet">Fuhrparklösungen</a>
                  </li>
                  <li>
                    <a href="/blogs">Blogs</a>
                  </li>
                  <li>
                    <a href="/about_us">Über uns</a>
                  </li>
              </ul>
            </nav>
            }
        </section>
      </header>
    </>
  )
}