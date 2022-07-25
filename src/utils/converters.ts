export const convertToBoolean = (value: string | undefined): boolean => {
  if (!(value === '1' || value === '0' || value === undefined)) {
    throw Error('Value must be either 1, 0 or undefined.');
  }

  if (value === '1') {
    return true;
  } else {
    return false;
  }
};
