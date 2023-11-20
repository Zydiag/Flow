"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { NavbarProps } from "@/types";
import { useQuery } from "convex/react";
import { MenuIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { Title } from "./title";
import { Banner } from "./banner";

export const Navbar = ({ isCollapsed, onResetWidth }: NavbarProps) => {
  const params = useParams();
  const doc = useQuery(api.documents.getById, {
    documentId: params.documentId as Id<"documents">,
  });

  // const doc = undefined;
  if (doc === undefined) {
    return (
      <nav className="bg-background dark:bg-[#1f1f1f] px-3 py-2 w-full flex items-center">
        <Title.Skeleton />
      </nav>
    );
  }

  if (doc == null) {
    return null;
  }

  return (
    <>
      <nav className="bg-background dark:bg-[#1f1f1f] px-3 py-2 w-full flex items-center gap-x-4">
        {isCollapsed && (
          <MenuIcon
            role="button"
            className="h-5 w-5 cursor-pointer text-muted-foreground"
            onClick={onResetWidth}
          />
        )}
        <div className="flex items-center justify-betweend w-full">
          <Title initialData={doc} />
        </div>
      </nav>
      {doc.isArchived && <Banner documentId={doc._id} />}
    </>
  );
};
