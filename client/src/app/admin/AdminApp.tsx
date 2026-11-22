"use client";

import dynamic from "next/dynamic";
import { Admin, Resource } from "react-admin";
import { dataProvider } from "./dataProvider";
import { OrderList } from "./orders/OrderList";

function AdminInner() {
  return (
    <Admin dataProvider={dataProvider} layout={({ children }) => <>{children}</>} title="RepairFlow">
      <Resource name="orders" list={OrderList} />
    </Admin>
  );
}

export default dynamic(() => Promise.resolve(AdminInner), { ssr: false });
