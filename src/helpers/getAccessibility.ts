const getAccessibility = (value: number): number => {
  if (value >= 0 && value <= 0.3) {
    return 1;
  } else if (value >= 0.4 && value <= 0.7) {
    return 2;
  } else {
    return 3;
  }
};

export default getAccessibility;
