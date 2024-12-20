"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { cn } from "@/lib/utils";
import { ItemProps } from "@/types";
import { useUser } from "@clerk/clerk-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useMutation } from "convex/react";
import {
  ChevronDown,
  ChevronRight,
  MoreHorizontal,
  PlusIcon,
  Trash,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const Item = ({
  id,
  label,
  onClick,
  icon: Icon,
  active,
  documentIcon,
  isSearch,
  level = 0,
  onExpand,
  expanded,
}: ItemProps) => {
  const { user } = useUser();
  const ChevronIcon = expanded ? ChevronDown : ChevronRight;

  const router = useRouter();
  const create = useMutation(api.documents.create);

  const archive = useMutation(api.documents.archive);

  const handleArchive = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!id) return;
    e.stopPropagation();
    const promise = archive({ documentId: id }).then(() => {
      router.push("/documents");
    });
    toast.promise(promise, {
      loading: "Archiving Document....",
      success: "Document Archived",
      error: "Failed to archive Document",
    });
  };

  const handleExpand = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    onExpand?.();
  };

  const handleCreate = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    if (!id) return;

    const promise = create({ title: "Untitled", parentDocumentId: id }).then(
      (documentId) => {
        if (!expanded) {
          onExpand?.();
        }
        router.push(`/documents/${documentId}`);
      },
    );
    toast.promise(promise, {
      loading: "Creating Document....",
      success: "Document Created",
      error: "Failed to create Document",
    });
  };

  return (
    <div
      onClick={onClick}
      role="button"
      style={{
        paddingLeft: level ? `${level * 12 + 12}px` : "12px",
      }}
      className={cn(
        "group min-h-[27px] text-sm py-2 pr-3 w-full hover:bg-primary/5 \
				flex items-center text-muted-foreground font-medium",
        active && "bg-primary/5 text-primary",
      )}
    >
      {!!id && (
        <div
          role="button"
          className="h-full rounded-sm hover:bg-neutral-300
					dark:hover:bg-neutral-600
					mr-1"
          onClick={handleExpand}
        >
          <ChevronIcon className="h-4 w-4 shrink-0 text-muted-foreground/50 " />
        </div>
      )}
      {documentIcon ? (
        <div className="shrink-0 mr-2 text-[18px]">{documentIcon}</div>
      ) : (
        <Icon className="shrink-0 h-[18px] w-[18px] mr-2 text-muted-foreground" />
      )}
      <span className="truncate">{label}</span>

      {isSearch && (
        <kbd
          className="ml-auto pointer-events-none inline-flex h-5 select-none items-center
					gap-1 rounded border border-muted bg-muted px-1.5 font-mono text-[10px] font-medium
					text-muted-foreground dark:bg-neutral-900 opacity-100"
        >
          <span className="text-xs">⌘</span>K
        </kbd>
      )}
      {!!id && (
        <div className="ml-auto flex items-center gap-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger onClick={(e) => e.stopPropagation()} asChild>
              <div
                role="button"
                className="opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm
								hover:bg-neutral-300 dark:hover:bg-neutral-600"
              >
                <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-60 "
              align="start"
              forceMount
              side="right"
            >
              <DropdownMenuItem onClick={handleArchive}>
                <Trash className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <div className="text-xs text-muted-foreground p-2">
                Last edited by: {user?.fullName}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          <div
            className="opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm
						hover:bg-neutral-300 dark:hover:bg-neutral-600"
            onClick={handleCreate}
          >
            <PlusIcon className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>
      )}
    </div>
  );
};

Item.Skeleton = function ItemSkeleton({ level }: { level?: number }) {
  return (
    <div
      style={{
        paddingLeft: level ? `${level * 12 + 25}px` : "12px",
      }}
      className="flex gap-x-2 py-[3px]"
    >
      <Skeleton className="h-4 w-4" />
      <Skeleton className="h-4 w-[30%]" />
    </div>
  );
};

export default Item;
