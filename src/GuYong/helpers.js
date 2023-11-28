export const getPositionValue = (party) => {
    if (party && party.address) {
      return party.address;
    }
    return '위치 정보가 없습니다.';
  };
  