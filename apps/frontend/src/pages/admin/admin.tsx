import { Loading } from "#/components/loading.tsx";
import { Table } from "#/pages/admin/table.tsx";
import { useAdminData } from "#/pages/admin/use-admin-data.ts";

export function AdminPage() {
  const { colorData, customerData, error, isLoading } = useAdminData();

  return (
    <>
      {error && <div>error</div>}

      {isLoading && <Loading />}

      {colorData && <Table data={colorData} title="colors" />}
      {customerData && <Table data={customerData} title="customers" />}
    </>
  );
}
