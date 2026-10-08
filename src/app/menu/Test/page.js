// import { notFound } from 'next/navigation';
// const DishList = [
//   { id: 'shiro', name: 'Shiro', price: 100 },
//   { id: 'kitfo', name: 'Kitfo', price: 200 },
//   { id: 'doro', name: 'Doro', price: 300 },
// ];
// export async function generateStaticParams() {
//   return [{ dish: 'kitfo' }, { dish: 'shiro' }, { dish: 'doro' }];
// }
// const MenuDish = async ({ params }) => {
//   await new Promise((resolve) => setTimeout(resolve, 3000));

//   const { dish } = await params;
//   const show = DishList.find((d) => d.id === dish);

//   if (!show) {
//     throw new Error('Dish not found');
//     // if(res.ok === 404){notFound();}
//   }
//   return (
//     <div>
//       <h1>Name:{show.name}</h1>
//       <p>Prive: {show.price}</p>
//     </div>
//   );
// };

// export default MenuDish;
import React from 'react';

const TestNameInMenu = () => {
  return <div>TestNameInMenu</div>;
};

export default TestNameInMenu;
