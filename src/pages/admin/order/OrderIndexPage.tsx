import { adminRoute } from "@/components/layouts";
import { createRoute } from "@tanstack/react-router";
import { Page, PageHeader } from "@/components/page";
import { DataTable } from "@/components/common/DataTable";
import { useGetOrders } from "@/common/quries/order";
import { columns } from "./components/columns";

function OrderIndexPage() {
  const { data = { data: [], total: 0 }, isFetching, isError } = useGetOrders();

  return (
    <Page table title="Order Management">
      <PageHeader title="Order Management" />
      <DataTable
        error={isError}
        loading={isFetching}
        data={data}
        columns={columns}
        total={data?.total}
      />
    </Page>
  );
}

export const orderRoute = createRoute({
  path: "/order",
  getParentRoute: () => adminRoute,
  component: () => <OrderIndexPage />,
});
