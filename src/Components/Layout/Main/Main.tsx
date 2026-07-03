import { lazy, Suspense } from 'react';
import { useGetValue } from '@/store';
import { BrowserRouter } from 'react-router-dom';

const Garage = lazy(() => import('../../Garage').then((module) => ({ default: module.Garage })));
const Winners = lazy(() => import('../../Winners').then((module) => ({ default: module.Winners })));

export function Main() {
  const value = useGetValue();
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <main>{value ? <Garage /> : <Winners />}</main>
      </Suspense>
    </BrowserRouter>
  );
}
