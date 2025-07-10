import { fetchCarList, PaginatedResponse } from "@/actions";
import HeadingPage from "@/components/dashboard/header-title";
import { columns } from "@/components/dashboard/table/column";
import { DataTable } from "@/components/dashboard/table/data-table";
import { CarDetailsType } from "@/types";
import { redirect } from "next/navigation";

async function getCarDetails({
  searchParams,
}: {
  searchParams: Promise<{[key: string]: string | string[] | undefined }>;
}): Promise<PaginatedResponse<CarDetailsType>> {
  const searchobj = await searchParams;
  const page = (searchobj && Number(searchobj.page)) || 1;
  const pageSize = (searchobj && Number(searchobj.pageSize)) || 10;
  const status = searchobj && typeof searchobj.status === "string" ? searchobj.status : undefined;
  const response = await fetchCarList({
    page,
    pageSize,
    status,
  });
  if (!response) {
    throw new Error("Failed to fetch car details");
  }
  return response || [];
}

const AdminDashboardPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const carDetails = await getCarDetails({searchParams});
  if (carDetails && carDetails.status === "UNAUTHORIZED") {
    redirect("/auth");
  }
  const { data, pagination } = carDetails;
  return (
    <div className="container mx-auto space-y-4">
      <HeadingPage
        heading="Car Listing Page"
        desc="This dashboard provides administrators with a comprehensive view of all the car listings available in the system. Admins can review details such as model, price, status, and more. Use this section to manage listings, track updates, and ensure data accuracy."
      />

      <DataTable
        columns={columns}
        data={data}
        tableName="Car Listings table"
        pagination={pagination}
      />
    </div>
  );
};

export default AdminDashboardPage;
