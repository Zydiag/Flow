"use client";

import {
  Block,
  BlockNoteEditor,
  filterSuggestionItems,
  PartialBlock,
} from "@blocknote/core";
import { BlockNoteSchema, combineByGroup, locales } from "@blocknote/core";

import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";

import { EditorPorps } from "@/types";
import { useState } from "react";
import { useTheme } from "next-themes";
import {
  SuggestionMenuController,
  getDefaultReactSlashMenuItems,
  useCreateBlockNote,
} from "@blocknote/react";
import { useEdgeStore } from "@/lib/edgestore";

export const Editor = ({
  onChangeAction,
  initialContent,
  editable,
}: EditorPorps) => {
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

  const [blocks, setBlocks] = useState<Block[]>();
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
