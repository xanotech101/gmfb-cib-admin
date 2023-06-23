import { DatePicker } from 'react-rainbow-components';
import { Label } from '../Label/Label';

export const DatePickerComponent = ({ handleDate, label, value, id }) => {
  return (
    <div className="space-y-1">
      <Label label={label} id={id} />
      <DatePicker id={id} value={value} hideLabel onChange={handleDate} formatStyle="large" />
    </div>
  );
};
