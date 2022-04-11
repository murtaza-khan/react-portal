import React from 'react';
import { NavBar } from 'src/components/navbar';
import { SideBar } from 'src/components/sidebar';

export const AddCoupon: React.FC = () => {
  return (
    <>
      <NavBar />
      <div className="drawer drawer-mobile">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <SideBar />
        <div className="drawer-content flex flex-col items-center bg-white mt-16">
          {/* <!-- Page content here --> */}
          Add Coupon
        </div>
      </div>
    </>
)};
