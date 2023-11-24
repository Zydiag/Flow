import { Doc, Id } from "@/convex/_generated/dataModel";
import { LucideIcon } from "lucide-react";

interface ItemProps {
  id?: Id<"documents">;
  documentIcon?: string;
  active?: boolean;
  expanded?: boolean;
  isSearch?: boolean;
  level?: number;
  onExpand?: () => void;

  label: string;
  onClick?: () => void;
  icon: LucideIcon;
}

interface DocumentListProps {
  parentDocumentId?: Id<"documents">;
  level?: number;
  data?: Doc<"documents">[];
}

interface ConfirmModalProps {
  children: React.ReactNode;
  onConfirmAction: () => void;
}

//search
type SearchState = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  toggle: () => void;
};

//settings
type SettingsState = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

//navbar
interface NavbarProps {
  isCollapsed: boolean;
  onResetWidth: () => void;
}

interface TitleProps {
  initialData: Doc<"documents">;
}

interface BannerProps {
  documentId: Id<"documents">;
}
interface MenuProps {
  documentId: Id<"documents">;
}

interface DocumentIdPageProps {
  params: {
    documentId: Id<"documents">;
  };
}

interface ToolbarProps {
  initialData: Doc<"documents">;
  preview?: boolean;
}

interface IconPickerProps {
  onChangeAction: (icon: string) => void;
  children: React.ReactNode;
  asChild?: boolean;
}

interface CoverImageStore {
  url?: string;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onReplace: (url: string) => void;
}

interface CoverImageProps {
  url?: string;
  preview?: boolean;
}
