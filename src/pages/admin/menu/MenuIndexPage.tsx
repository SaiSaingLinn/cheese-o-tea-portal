import { useModal } from "@/common/hooks/useModal";
import { adminRoute } from "@/components/layouts";
import { createRoute } from "@tanstack/react-router";
import { Page, PageHeader } from "@/components/page";
import { AddButton } from "@/components/common";
import { columns } from "./components/columns";
import { DataTable } from "@/components/common/DataTable";
import { MenuCreateForm } from "./components/MenuCreate";
import { useGetMenus } from "@/common/quries/menu";

function MenuIndexPage() {
  const { openModal } = useModal();
  const { data = { data: [], total: 0 }, isFetching, isError } = useGetMenus();

  return (
    <Page table title="Menu">
      <PageHeader title="Menu">
          <AddButton
            onClick={() =>
              openModal({
                title: "Add New Menu",
                content: <MenuCreateForm />,
              })
            }
          />
      </PageHeader>
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

export const menuRoute = createRoute({
  path: "/menu",
  getParentRoute: () => adminRoute,
  component: () => <MenuIndexPage />,
});
