import { fetchAuditLogs } from "@/actions";
import HeadingPage from "@/components/dashboard/header-title";
import { columnsAuditLogs } from "@/components/dashboard/table/column";
import { DataTable } from "@/components/dashboard/table/data-table";
// import { AuditLogType } from "@/types/validations/audit";
import { redirect } from "next/navigation";

async function getAuditLogsDetails(
  searchParams: { [key: string]: string | string[] | undefined }
) {
  const page = Number(searchParams.page) || 1;
    const pageSize = Number(searchParams.pageSize) || 10;

    const response = await fetchAuditLogs({
      page,
      pageSize,
    });

    if (!response) {
      throw new Error("Failed to fetch audit logs details");
    }

    return response;

}


const AdminDashboardAuditPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const resolvedSearchParams = await searchParams;
  const auditLogs = await getAuditLogsDetails(resolvedSearchParams);
  if (auditLogs && auditLogs.status === "UNAUTHORIZED") {
    redirect("/auth");
  }
  const { data, pagination } = auditLogs;
  return (
    <div className="containermx-auto space-y-4">
      <HeadingPage
        heading="Audit Logs Page"
        desc="This dashboard provides administrators with a comprehensive view of all the audit logs available in the system. Admins can review details such as user actions, timestamps, and more. Use this section to manage logs, track updates, and ensure data accuracy."
      />

      <DataTable
        columns={columnsAuditLogs}
        data={data || []}
        tableName="Audit Logs"
        pagination={pagination}
      />
    </div>
  );
};

export default AdminDashboardAuditPage;
