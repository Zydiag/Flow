import { ConfirmModal } from "@/components/modals/confirm-modal";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { BannerProps } from "@/types";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const Banner = ({ documentId }: BannerProps) => {
  const router = useRouter();
  const deleteDocument = useMutation(api.documents.deleteDocument);
  const restore = useMutation(api.documents.restore);

  const handleDelete = () => {
    const promise = deleteDocument({ documentId });

    toast.promise(promise, {
      loading: "Deleting Document....",
      success: "Document Deleted",
      error: "Failed to delete Document",
    });
    router.push("/documents");
  };

  const handleRestore = () => {
    const promise = restore({ documentId });

    toast.promise(promise, {
      loading: "Restoring Document....",
      success: "Document Restored",
      error: "Failed to restore Document",
    });
  };

  return (
    <div
      className="w-full bg-rose-500 text-center text-sm p-2 text-white
			flex items-center gap-x-2 justify-center"
    >
      <p>This document is in the trash</p>

      <Button
        size="sm"
        onClick={handleRestore}
        variant="outline"
        className="border-white bg-transparent hover:bg-primary/5 text-white
				hover:text-white p-1 px-2 h-auto font-normal"
      >
        Restore Page
      </Button>
      <ConfirmModal onConfirmAction={handleDelete}>
        <Button
          size="sm"
          variant="outline"
          className="border-white  bg-transparent hover:bg-primary/5 text-white
				hover:text-white p-1 px-2 h-auto font-normal"
        >
          Delete Forever
        </Button>
      </ConfirmModal>
    </div>
  );
};
