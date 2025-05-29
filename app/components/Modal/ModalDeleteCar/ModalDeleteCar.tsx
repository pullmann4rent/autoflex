
import { IModalDeleteCar } from "./types";
import { AiOutlineClose } from 'react-icons/ai';
import { Form, useNavigation } from "@remix-run/react";
import Modal from "~/utils/Modal";
import Lion from '../../../assets/lion.png';

export default function ModalDeleteCar({
  car_id,
  onPressClose
}: IModalDeleteCar) {
  const navigation = useNavigation();
  return (
    <Modal onClose={onPressClose}>
      <section className="modal-delete">
        <section className="flex jc-sb modal-info">
          <img src={Lion} className="modal-lion" />
          <h2>Auto löschen</h2>
          <button type="button" onClick={onPressClose}>
            <AiOutlineClose size={24} color='#222' />
          </button>
        </section>
        <h3>Bist du dir sicher, dass du dieses Auto löschen möchtest ?</h3>
        <section className="flex jc">
          <Form method="post" name="delete-car-form" data-netlify="true" encType="multipart/form-data">
            <input type="hidden" name="form-name" value="delete-car-form" />
            <input type="hidden" name="form" value="delete_car" />
            <input type="hidden" name="car_id" value={car_id} defaultValue={car_id} />
            <button type="submit" className="delete-btn">{ navigation.state !== 'idle' ? 'Ladet...' : 'Löschen'}</button>
          </Form>
        </section>
      </section>
    </Modal>
  )
}