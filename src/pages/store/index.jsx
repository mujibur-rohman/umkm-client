import Avatar from "@/components/Avatar/avatar";
import React from "react";

const Store = () => {
  return (
    <section>
      <div className="border-b-[1px] px-10 py-3 flex flex-col items-center gap-2">
        <Avatar name="Mujay" size="lg" />
        <div className="flex flex-col items-center">
          <p className="font-medium text-xl">Mujay</p>
          <span>Kp Karang Tengah</span>
        </div>
      </div>
      <div className="py-2">
        <p className="text-xl font-medium text-center">Produk</p>
      </div>
    </section>
  );
};

export default Store;
