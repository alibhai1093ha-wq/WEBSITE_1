/**
 * Shared validation + sanitization for contact inquiries.
 * Used by BOTH the client form and the API route so the
 * rules can never drift apart (client validation is only
 * for UX — the server always re-validates).
 */

export interface ContactInput {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export interface FieldErrors {
  [key: string]: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[+\d][\d\s\-().]{5,20}$/;

/** Strip control chars and angle brackets to neutralize injection attempts. */
export function sanitizeText(value: string): string {
  return value
    .replace(/[<>]/g, "")
    // eslint-disable-next-line no-control-regex
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .trim();
}

export function validateContact(input: Partial<ContactInput>): FieldErrors {
  const errors: FieldErrors = {};

  const name = sanitizeText(input.name ?? "");
  const email = sanitizeText(input.email ?? "");
  const phone = input.phone ? sanitizeText(input.phone) : "";
  const subject = sanitizeText(input.subject ?? "");
  const message = sanitizeText(input.message ?? "");

  if (!name) errors.name = "Please enter your name.";
  else if (name.length < 2 || name.length > 100)
    errors.name = "Name must be between 2 and 100 characters.";

  if (!email) errors.email = "Please enter your email address.";
  else if (!EMAIL_RE.test(email) || email.length > 254)
    errors.email = "Please enter a valid email address.";

  if (phone && !PHONE_RE.test(phone))
    errors.phone = "Please enter a valid phone number.";

  if (!subject) errors.subject = "Please choose a subject.";
  else if (subject.length > 150) errors.subject = "Subject is too long.";

  if (!message) errors.message = "Please enter a message.";
  else if (message.length < 10)
    errors.message = "Message must be at least 10 characters.";
  else if (message.length > 5000)
    errors.message = "Message must be under 5,000 characters.";

  return errors;
}
