
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
import { IMeetingCalendar } from '../MeetingCalendar/types';
import '@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css';
import DatePicker, { Calendar, DayValue } from '@hassanmojab/react-modern-calendar-datepicker';
import { useFetcher } from 'react-router-dom';
import { IFormMeetingCalendar } from '~/routes/meetingCalendar';

export default function ModalCalendar({
  onPressClose
}: IMeetingCalendar) {
  const [selectedDay, setSelectedDay] = useState<DayValue | null>(null);
  const [step, setStep] = useState<number>(1);
  const [time, setTime] = useState<string | null>('10:00');
  const [form, setForm] = useState<Omit<IFormMeetingCalendar, 'date' | 'time'>>({
    email: '',
    name: '',
    phone: '',
  });
  const fetcher = useFetcher();

  const handleSendMetting = async (e: any) => {
    e.preventDefault();
    if(form.email !== '' && form.name !== '') {
      fetcher.submit({json: JSON.stringify({...form, date: selectedDay, time})}, { method: 'post', action: '/meetingCalendar' });
    }
  };

  useEffect(() => {
    if(fetcher.data && fetcher.data?.success) {
      setStep(4);
    }
  }, [fetcher.data]);
  return (
    <Modal className='modal-calendar' onClose={onPressClose}>
          <section className="calendar-content">
            { step === 1 &&
              <section className="calendar-inner">
                <img src="https://i.pravatar.cc/150?img=1" alt="Mitarbeiter" />
                <p className="cal-text">Um ein Meeting mit Angelina Neuhaus bitten</p>
                <Calendar
                  value={selectedDay}
                  onChange={(e) => setSelectedDay(e)}
                  shouldHighlightWeekends
                  calendarClassName='calendar-main'
                />
                <button type="button" className="btn-meeting" onClick={() => selectedDay && setStep(2)}>Weiter</button>
              </section>
            }

            {
              step === 2 && selectedDay &&
              <section className="calendar-inner">
                <p className="text-meeting-time">Bitte wähle eine Uhrzeit aus.</p>
                <select className="calendar-time" onChange={e => setTime(e.target.value)}>
                  <option value="10:00">10:00</option>
                  <option value="10:30">10:30</option>
                  <option value="11:00">11:00</option>
                  <option value="11:30">11:30</option>
                  <option value="12:00">12:00</option>
                  <option value="12:30">12:30</option>
                  <option value="13:00">13:00</option>
                  <option value="13:30">13:30</option>
                  <option value="14:00">14:00</option>
                  <option value="14:30">14:30</option>
                  <option value="15:00">15:00</option>
                  <option value="15:30">15:30</option>
                  <option value="16:00">16:00</option>
                  <option value="16:30">16:30</option>
                  <option value="17:00">17:00</option>
                  <option value="17:30">17:30</option>
                  <option value="18:00">18:00</option>
                  <option value="18:30">18:30</option>
                  <option value="19:00">19:00</option>
                </select>
                <button type="button"  className="btn-meeting" onClick={() => setStep(3)}>Weiter</button>
              </section>
            }

            {
              step === 3 &&
              <section className="calendar-inner">
                <p className="text-meeting-time">Geben Sie Ihre Kontaktdaten ein.</p>
                <fetcher.Form className="flex fd-col jc-c" method="POST" onSubmit={handleSendMetting}>
                  <input type="text" name="name" onChange={(e) => setForm(prev => ({...prev, name: e.target.value}))} placeholder="Vollständiger Name" />
                  <input type="text" name="email" onChange={(e) => setForm(prev => ({...prev, email: e.target.value}))}  placeholder="E-Mail" />
                  <input type="text" name="phone" onChange={(e) => setForm(prev => ({...prev, phone: e.target.value}))}  placeholder="Telefon (Optional)" />
                  <button type="submit" className="btn-meeting">{ fetcher.state !== 'idle' ? 'Ladet...' : 'Jetzt Meeting vereinbaren'}</button>
                </fetcher.Form>
              </section>
            }

            {
              step === 4 && (
                <section className="calendar-inner calendar-step-end">
                  <p>Vielen Dank!</p>
                  <p>Wir werden uns bei Ihnen am ausgewählten Termin melden.</p>
                  <button type="button" onClick={onPressClose}>Schließen</button>
                </section>
              )
            }
          </section>
    </Modal>
  )
}