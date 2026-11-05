import { Disclosure } from '@/components/ui/Disclosure';
import { faq } from './data';
import s from './Faq.module.scss';

export function Faq() {
  return (
    <section
      id="faq"
      tabIndex={-1}
      data-anchor-target
      aria-labelledby="faq-heading"
      className={`${s.section} ${s.faq}`}
    >
      <div>
        <h2 id="faq-heading">Запитання.</h2>
        <p>
          Маєте запитання? Ми підготували відповіді на все, що потрібно знати про співпрацю з нами.
        </p>
      </div>
      <div>
        {faq.map((item) => (
          <Disclosure key={item.question} title={item.question}>
            <p>{item.answer}</p>
          </Disclosure>
        ))}
      </div>
    </section>
  );
}
