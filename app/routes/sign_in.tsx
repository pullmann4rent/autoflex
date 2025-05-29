import { Footer } from "~/components/Footer/Footer";
import { Header } from "~/components/Header/Header";
import '../styles/index.css';
import '../styles/fleet.css';
import { SlCallEnd, SlEnvolope, SlLocationPin } from "react-icons/sl";
import { SignIn } from "@clerk/remix";

export default function Fleet() {
  return (
    <>
      <Header />
        <SignIn />
      <Footer />
    </>
  )
}