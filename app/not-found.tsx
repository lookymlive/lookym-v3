

import { FC } from 'react';
import Image from 'next/image';

const Error404: FC = () => {
  return (
    <div className='text-center justify-center '>
      <h1 className='text-4xl font-extrabold text-li dark:text-white'>Error 404: Página no encontrada</h1>
      <Image src="https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExY2Z5NHI3b3N6bWJpbTE0d3hlZm1zc3k3NHNlcXgwaGl1NjR1Z3VleSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/2vs70gBAfQXvOOYsBI/giphy.gif" alt="Confused Travolta" width={400} height={300} />
      <p className='text-center font-extrabold text-lime-400      '>Lo sentimos, la página que estás buscando no existe.</p>
    </div>
  );
};

export default Error404;