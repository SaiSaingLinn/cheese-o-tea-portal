import { useModal } from "@/common/hooks/useModal";
import { useGetCategories } from "@/common/quries/category";
import { adminRoute } from "@/components/layouts";
import { createRoute } from "@tanstack/react-router";
import { Page, PageHeader } from "@/components/page";
import { AddButton } from "@/components/common";
import { CategoryCreateForm } from "./components/CategoryCreate";
import { columns } from "./components/columns";
import { DataTable } from "@/components/common/DataTable";

function CategoryIndexPage() {
  const { openModal } = useModal();
  const { data = { data: [], total: 0 }, isFetching, isError } = useGetCategories();

  return (
    <Page table title="Categories">
      <PageHeader title="Categories">
          <AddButton
            onClick={() =>
              openModal({
                title: "Add New Category",
                content: <CategoryCreateForm />,
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

export const categoryRoute = createRoute({
  path: "/category",
  getParentRoute: () => adminRoute,
  component: () => <CategoryIndexPage />,
});
