'use client';

import { useEdgeStore } from '@/lib/edgestore';
import { useTheme } from 'next-themes';

import { BlockNoteEditor, PartialBlock } from '@blocknote/core';
import '@blocknote/core/style.css';
import { BlockNoteView, useBlockNote } from '@blocknote/react';

interface EditorProps {
    initialContent?: string;
    onChange: (value: string) => void;
    editable?: boolean;
}
const Editor = ({ initialContent, onChange, editable }: EditorProps) => {
    const { resolvedTheme } = useTheme();
    const { edgestore } = useEdgeStore();

    const handleUpload = async (file: File) => {
        const response = await edgestore.publicFiles.upload({
            file,
        });

        return response.url;
    };

    const editor: BlockNoteEditor = useBlockNote({
        editable,
        initialContent: initialContent
            ? (JSON.parse(initialContent) as PartialBlock[])
            : undefined,
        onEditorContentChange: (editor) => {
            onChange(JSON.stringify(editor.topLevelBlocks, null, 2));
        },
        uploadFile: handleUpload,
    });

    return (
        <div>
            <BlockNoteView
                editor={editor}
                theme={resolvedTheme === 'dark' ? 'dark' : 'light'}
            />
        </div>
    );
};

export default Editor;
