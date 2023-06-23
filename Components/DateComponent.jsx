import { Text } from 'react-native';
import moment from 'moment';
import 'moment/locale/uk';

const DateComponent = () => {
  moment.locale('uk'); 
  const date = moment().format('DD MMMM, YYYY | HH:mm');
  return  <Text>{date}</Text> 
};

export default DateComponent;