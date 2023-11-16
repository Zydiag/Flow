"use client";

import { Spinner } from "@/components/spinner";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
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

  return <div>TrashBox</div>;
};

export default TrashBox;
