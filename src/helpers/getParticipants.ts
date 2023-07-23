const getParticipants = (value: number): number => {
  if (value >= 0 && value <= 1) {
    return 1;
  } else if (value === 2) {
    return 2;
  } else {
    return 3;
  }
};

export default getParticipants;
