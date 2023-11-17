"use client";

import { ConfirmModal } from "@/components/modals/confirm-modal";
import { Spinner } from "@/components/spinner";
import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { Search, Trash, Undo } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const TrashBox = () => {
  const router = useRouter();
  const params = useParams();
  const documents = useQuery(api.documents.getTrashItems);
  const restore = useMutation(api.documents.restore);
  const deleteDocument = useMutation(api.documents.deleteDocument);

  const [search, setSearch] = useState("");
  const filteredDocuments = documents?.filter((document) => {
    return document.title.toLowerCase().includes(search.toLowerCase());
  });

  const handleClick = (documentId: string) => {
    router.push(`/documents/${documentId}`);
  };

  const handleRestore = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    documentId: Id<"documents">,
  ) => {
    event.stopPropagation();
    const promise = restore({ documentId });

    toast.promise(promise, {
      loading: "Restoring Document....",
      success: "Document Restored",
      error: "Failed to restore Document",
    });
  };
  const handleRemove = (documentId: Id<"documents">) => {
    const promise = deleteDocument({ documentId });

    toast.promise(promise, {
      loading: "Deleting Document....",
      success: "Document Deleted",
      error: "Failed to delete Document",
    });

    if (params.documentId === documentId) {
      router.push("/documents");
    }
  };

  if (documents === undefined) {
    return (
      <div className="h-full flex items-center justify-center p-4">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="text-sm">
      <div className="flex items-center gap-x-1 p-2">
        <Search className="h-4 w-4" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-7 px-2 focus-visible ring-transparent"
          placeholder="Filter by page title"
        />
      </div>
      <div className="mt-2 px-1 pb-1">
        <p className="hidden last:block text-xs text-muted-foreground text-center pb-2">
          No documents found
        </p>
        {filteredDocuments?.map((document) => (
          <div
            key={document._id}
            role="button"
            className="text-sm rounded-sm w-full hover:bg-primary/5 flex items-center
						text-primary justify-between p-1"
            onClick={() => handleClick(document._id)}
          >
            <span className="truncate pl-2">{document.title}</span>
            <div className="flex items-center">
              <div
                onClick={(e) => handleRestore(e, document._id)}
                role="button"
                className="rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-800"
              >
                <Undo className="h-4 w-4 text-muted-foreground" />
              </div>
              <ConfirmModal onConfirmAction={() => handleRemove(document._id)}>
                <div
                  role="button"
                  className="rounded-sm p-2 text-muted-foreground hover:text-red-400 dark:hover:text-red-600"
                >
                  <Trash className="h-4 w-4" />
                </div>
              </ConfirmModal>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrashBox;
