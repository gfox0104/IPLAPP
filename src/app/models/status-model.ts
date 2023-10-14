interface Status {
  name: string;
  color: string;
}


export const getStatusColor = (status) => {
  let color;

  switch (status) {
    case 1:
      color = '#DAEF56';
      break;
    case 2:
      color = '#FAC39A';
      break;
    case 3:
      color = '#FAC39A';
      break;
    case 5:
      color = '#BDC0ED';
      break;
    case 6:
      color = '#E4C2E5';
      break;
    case 7:
      color = '#FCF998';
      break;
    case 10:
      color = '#8F8F8F';
      break;
    default:
      color = 'transparent';
      break;
  }

  return color;
}


