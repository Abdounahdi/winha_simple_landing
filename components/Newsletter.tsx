"use client";

import { useState } from "react";
import styles from "./Footer.module.scss";

type Props = { label: string; button: string; thanks: string };

// [placeholder] wire this to your email provider (Mailchimp, Brevo, etc.)
export function Newsletter({ label, button, thanks }: Props) {
  const [sent, setSent] = useState(false);

  if (sent) {
    return <p className={styles.thanks}>{thanks}</p>;
  }

  return (
    <form
      className={styles.form}
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      <label htmlFor="newsletter-email" className="visually-hidden">
        {label}
      </label>
      <input id="newsletter-email" type="email" name="email" placeholder={label} required autoComplete="email" dir="ltr" />
      <button type="submit">{button}</button>
    </form>
  );
}
