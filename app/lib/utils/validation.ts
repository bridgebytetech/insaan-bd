// lib/utils/validation.ts
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^(\+880|880|0)?1[3-9]\d{8}$/;
  return phoneRegex.test(phone.replace(/\s|-/g, ''));
};

export const validateAge = (age: number): boolean => {
  return age > 0 && age < 18;
};
