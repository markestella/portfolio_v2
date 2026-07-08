const CONTACT_VISITOR_KEY_STORAGE = 'portfolio-contact-visitor-key';

const createVisitorKey = () => {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }

  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
};

export const getContactVisitorKey = () => {
  if (typeof window === 'undefined') {
    return '';
  }

  const existingKey = window.localStorage.getItem(CONTACT_VISITOR_KEY_STORAGE);
  if (existingKey) {
    return existingKey;
  }

  const visitorKey = createVisitorKey();
  window.localStorage.setItem(CONTACT_VISITOR_KEY_STORAGE, visitorKey);
  return visitorKey;
};
