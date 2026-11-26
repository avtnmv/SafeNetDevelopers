import { ContactForm } from '@/features/contact/ContactForm';
import { PhoneInput } from '@/features/contact/PhoneInput';
import s from '@/features/contact/Contact.module.scss';
import b from './Branding.module.scss';
export function BrandingContact() {
  return (
    <section
      id="contact"
      tabIndex={-1}
      data-anchor-target
      className={`${s.section} ${b.contact}`}
      aria-labelledby="contact-heading"
    >
      <div className={s.formColumn}>
        <ContactForm>
          <div className={s.formHeading}>
            <h3>Обговоримо ваш брендинг</h3>
          </div>
          <input type="hidden" name="plan" value="branding" />
          <div className={s.fields}>
            <label htmlFor="contact-name">
              Ваше ім’я*
              <input id="contact-name" name="name" required autoComplete="name" maxLength={120} />
            </label>
            <PhoneInput />
            <label htmlFor="contact-email">
              Електронна пошта (необов’язково)
              <input
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                maxLength={254}
              />
            </label>
            <label htmlFor="branding-task">
              Що плануєте
              <select
                id="branding-task"
                name="brandingTask"
                defaultValue="Потрібна допомога з вибором"
              >
                <option>Потрібна допомога з вибором</option>
                <option>Новий бренд</option>
                <option>Оновлення бренду</option>
                <option>Окремий модуль</option>
              </select>
            </label>
            <label htmlFor="contact-message">
              Коротко про бізнес і задачу*
              <textarea
                id="contact-message"
                name="message"
                required
                rows={4}
                maxLength={2000}
                placeholder="Чим займаєтесь, хто ваші клієнти та що хочете створити: назву, логотип, голос бренду чи айдентику. Можна додати посилання на матеріали, побажання щодо строку й бюджету."
              />
            </label>
          </div>
          <button type="submit">Обговорити брендинг</button>
          <p className={s.consent}>
            Надсилаючи форму, ви погоджуєтесь з{' '}
            <a href="/legal/terms-of-service">умовами використання</a> та{' '}
            <a href="/legal/privacy-policy">політикою конфіденційності</a>. Дані заявки передаються
            нашій команді через Telegram.
          </p>
        </ContactForm>
      </div>
      <div className={s.copy}>
        <div className={s.copyIntro}>
          <h2 id="contact-heading">Розкажіть про ваш бренд</h2>
          <p>
            Запускаєте новий бізнес чи хочете оновити наявний? Розкажіть, що робите, для кого
            працюєте та які елементи бренду вже маєте.
          </p>
        </div>
        <div className={s.copyBenefits}>
          <div className={s.copyBenefit}>
            <h3>Почнемо з вашої задачі</h3>
            <p>Уточнимо вихідну ситуацію й допоможемо визначити потрібний склад роботи.</p>
          </div>
          <div className={s.copyBenefit}>
            <h3>Підготуємо пропозицію</h3>
            <p>Погодимо результати, етапи, строки та вартість до початку роботи.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
