import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { IconCircleCheckFilled, IconXboxXFilled } from "@tabler/icons-react";
import { toast } from "sonner";
import { CarTypeStatus } from "@/types";
import { updateCarStatus } from "@/actions";
import useLoadingStore from "@/store/loading";
import { useRouter } from "next/navigation";

interface ApproveRejectStatusProps {
  carId: string;
}
const ApproveRejectStatus = ({ carId }: ApproveRejectStatusProps) => {
  const [status, setStatus] = useState<CarTypeStatus>("PENDING");
  const { loading, setLoading } = useLoadingStore();
  const router = useRouter();
  const handleSetStatus = (newStatus: CarTypeStatus) => {
    setStatus(newStatus);
  };
  const handleChangeStatus = async () => {
    try {
      setLoading();
      const response = await updateCarStatus({
        carId,
        status,
      });
      if (response.status === "SUCCESS") {
        router.push("/admin/dashboard/car-listing?refresh=true");
        toast.success(`Car model has been ${status.toLowerCase()} successfully.`);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error("Error changing status:", error);
      toast.error("Failed to change status. Please try again.");
    } finally {
      setLoading();
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger className="text-sm font-medium text-blue-600 hover:underline">
        <div className="flex items-center gap-2">
          <Button
            loading={loading}
            variant="outline"
            className="flex items-center gap-1"
            onClick={() => handleSetStatus("APPROVED")}
          >
            <IconCircleCheckFilled className="fill-green-500 dark:fill-green-400" />
            Approve
          </Button>
          <Button
            loading={loading}
            variant="destructive"
            onClick={() => handleSetStatus("REJECTED")}
          >
            <IconXboxXFilled />
            Reject
          </Button>
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm Action</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to {status.toLocaleLowerCase()} this car model?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleChangeStatus}>Confirm</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ApproveRejectStatus;
