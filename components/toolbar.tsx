"use client";

import { ToolbarProps } from "@/types";
import { IconPicker } from "./icon-picker";
import { Button } from "./ui/button";
import { ImageIcon, Smile, X } from "lucide-react";
import { ElementRef, useRef, useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

import TextareaAutosize from "react-textarea-autosize";
import { useCoverImage } from "@/hooks/use-cover-image";

export const Toolbar = ({ initialData, preview }: ToolbarProps) => {
  const inputRef = useRef<ElementRef<"textarea">>(null);
  const [isEditing, setIsEditing] = useState(false);
  // const [value,setValue] = useState(initialData?.title || "Untitled");
  const [value, setValue] = useState(initialData?.title);

  const update = useMutation(api.documents.updateDoc);
  const removeIcon = useMutation(api.documents.removeIcon);

  const coverImage = useCoverImage();

  const enableInput = () => {
    if (preview) return;
    setIsEditing(true);
    setTimeout(() => {
      setValue(initialData?.title);
      inputRef.current?.focus();
    }, 0);
  };

  const disableInput = () => {
    setIsEditing(false);
  };

  const handleChange = (value: string) => {
    setValue(value);
    update({
      documentId: initialData?._id,
      title: value || "Untitled",
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      disableInput();
    }
  };

  const handleIconChange = (icon: string) => {
    update({
      documentId: initialData?._id,
      icon,
    });
  };

  const handleRemoveIcon = () => {
    removeIcon({
      documentId: initialData?._id,
    });
  };

  return (
    <div className="pl-[54px] group relative">
      {!!initialData.icon && !preview && (
        <div className="flex items-center gap-x-2 group/icon pt-6">
          <IconPicker onChangeAction={handleIconChange}>
            <p className="text-6xl hover:opacity-75">{initialData.icon}</p>
          </IconPicker>
          <Button
            onClick={handleRemoveIcon}
            variant="outline"
            size="icon"
            className="rounded-full opacity-0 group-hover:opacity-100
						transition text-muted-foreground text-xs"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
      {!!initialData.icon && preview && (
        <p className="text-6xl pt-6">{initialData.icon}</p>
      )}
      <div className="opacity-0 group-hover:opacity-100 flex items-center gap-x-1 py-4">
        {!initialData?.icon && !preview && (
          <IconPicker asChild onChangeAction={handleIconChange}>
            <Button
              variant="outline"
              size="sm"
              className="text-xs text-muted-foreground"
            >
              <Smile className="h-4 w-4 mr-2" />
              Add Icon
            </Button>
          </IconPicker>
        )}
        {!initialData.coverImage && !preview && (
          <Button
            onClick={coverImage.onOpen}
            variant="outline"
            size="sm"
            className="text-xs text-muted-foreground"
          >
            <ImageIcon className="h-4 w-4 mr-2" />
            Add Cover
          </Button>
        )}
      </div>
      {isEditing && !preview ? (
        <TextareaAutosize
          ref={inputRef}
          onBlur={disableInput}
          onKeyDown={handleKeyDown}
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          className="text-5xl bg-transparent font-bold break-words outline-none
					text-[#3f3f3f] dark:text-[#cfcfcf] resize-none"
        />
      ) : (
        <div
          onClick={enableInput}
          className="pb-[11.5px] text-5xl font-bold break-words ouline-none
					text-[#3f3f3f] dark:text-[#cfcfcf] resize-none"
        >
          {initialData.title}
        </div>
      )}
    </div>
  );
};
