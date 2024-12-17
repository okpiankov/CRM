export const nameRegexp = /^([а-яёА-яЁ_-]|[a-zA-Z_-]){2,}/;
export const emailRegex =
  /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
export const telRegexp = /^((\+7|7|8)+([0-9]){10})$/;

export const validateWorkName = (
  value: string,
  setWorkNameError: (workNameError: string) => void
) => {
  const isValid = value.match(nameRegexp);
  if (isValid) {
    setWorkNameError("");
  } else {
    setWorkNameError("Это не похоже на имя");
  }
};

export const validateCustomerName = (
  value: string,
  setCustomerNameError: (customerNameError: string) => void
) => {
  const isValid = value.match(nameRegexp);
  if (isValid) {
    setCustomerNameError("");
  } else {
    setCustomerNameError("Это не похоже на имя");
  }
};

export const validateContactPerson = (
  value: string,
  setContactPersonError: (contactPersonError: string) => void
) => {
  const isValid = value.match(nameRegexp);
  if (isValid) {
    setContactPersonError("");
  } else {
    setContactPersonError("Это не похоже на имя");
  }
};

export const validateFromSource = (
  value: string,
  setFromSourceError: (fromSourceError: string) => void
) => {
  const isValid = value.match(nameRegexp);
  if (isValid) {
    setFromSourceError("");
  } else {
    setFromSourceError("Введите не менее 2х букв");
  }
};

export const validateEmail = (
  value: string,
  setEmailError: (emailError: string) => void
) => {
  const isValid = value.match(emailRegex);
  if (isValid) {
    setEmailError("");
  } else {
    setEmailError("Это не похоже на емейл");
  }
};

export const validateTel = (
  value: string,
  setTelError: (telError: string) => void
) => {
  const isValid = value.match(telRegexp);
  if (isValid) {
    setTelError("");
  } else {
    setTelError("Это не похоже на телефон");
  }
};
