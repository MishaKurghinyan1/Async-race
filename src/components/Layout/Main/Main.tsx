import { lazy, Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { useGetValue } from '@/store';
import { useGetSize } from '@/store';

import loadingVideo from '@/assets/videos/loading.webm';

const Garage = lazy(() => import('../../Garage').then((module) => ({ default: module.Garage })));
const Winners = lazy(() => import('../../Winners').then((module) => ({ default: module.Winners })));

export function Main() {
  const value = useGetValue();
  const size = useGetSize();

  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="video-loading-container">
            <video src={loadingVideo} autoPlay loop muted playsInline width={size} height={size} />
          </div>
        }
      >
        <main>{value ? <Garage /> : <Winners />}</main>
      </Suspense>
    </BrowserRouter>
  );
}
