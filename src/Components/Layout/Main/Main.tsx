import { Winners } from '../../Winners';
import { Garage } from '../../Garage';
import { useGetValue } from '@/store';
import { BrowserRouter } from 'react-router-dom';

export function Main() {
  const value = useGetValue();
  return (
    <BrowserRouter>
      <main>{value ? <Garage /> : <Winners />}</main>;
    </BrowserRouter>
  );
}
