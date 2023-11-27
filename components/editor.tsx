"use client";

import { BlockNoteEditor, PartialBlock } from "@blocknote/core";

import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";

import { useTheme } from "next-themes";
import { SuggestionMenuController, useCreateBlockNote } from "@blocknote/react";
import { useEdgeStore } from "@/lib/edgestore";
import { EditorProps } from "@/types";

export const Editor = ({
  onChangeAction,
  initialContent,
  editable,
}: EditorProps) => {
  const handleUploadImage = async (file: File) => {
    const res = await edgestore.publicFiles.upload({ file });
    return res.url;
  };

  const editor: BlockNoteEditor = useCreateBlockNote({
    uploadFile: handleUploadImage,
    initialContent: initialContent
      ? (JSON.parse(initialContent) as PartialBlock[])
      : undefined,
  });

  const { resolvedTheme } = useTheme();

  const { edgestore } = useEdgeStore();

  return (
    <div>
      <BlockNoteView
        editable={editable}
        onSelectionChange={() =>
          onChangeAction(JSON.stringify(editor.document, null, 2))
        }
        onChange={() =>
          onChangeAction(JSON.stringify(editor.document, null, 2))
        }
        theme={resolvedTheme === "dark" ? "dark" : "light"}
        editor={editor}
      >
        <SuggestionMenuController triggerCharacter={"/"} />
      </BlockNoteView>
    </div>
  );
};
