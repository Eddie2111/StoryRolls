"use client";

import { EditorContent, EditorContext, useEditor } from "@tiptap/react";
import * as React from "react";

// --- Tiptap Core Extensions ---
import { Superscript } from "@tiptap/extension-superscript";
import { Typography } from "@tiptap/extension-typography";
import { TextAlign } from "@tiptap/extension-text-align";
import { Underline } from "@tiptap/extension-underline";
import { Subscript } from "@tiptap/extension-subscript";
import { Highlight } from "@tiptap/extension-highlight";
import { TaskList } from "@tiptap/extension-task-list";
import { TaskItem } from "@tiptap/extension-task-item";
import { StarterKit } from "@tiptap/starter-kit";
import { Image } from "@tiptap/extension-image";

// --- Custom Extensions ---
import { TrailingNode } from "@/components/tiptap-extension/trailing-node-extension";
import { Selection } from "@/components/tiptap-extension/selection-extension";
import { Link } from "@/components/tiptap-extension/link-extension";

// --- UI Primitives ---
import { Toolbar, ToolbarGroup, ToolbarSeparator } from "@/components/tiptap-ui-primitive/toolbar";
import { Spacer } from "@/components/tiptap-ui-primitive/spacer";
import { Button } from "@/components/tiptap-ui-primitive/button";

// --- Tiptap Node ---
import { ImageUploadNode } from "@/components/tiptap-node/image-upload-node/image-upload-node-extension";
import "@/components/tiptap-node/code-block-node/code-block-node.scss";
import "@/components/tiptap-node/paragraph-node/paragraph-node.scss";
import "@/components/tiptap-node/image-node/image-node.scss";
import "@/components/tiptap-node/list-node/list-node.scss";

// --- Tiptap UI ---
import {
    ColorHighlightPopover,
    ColorHighlightPopoverContent,
    ColorHighlightPopoverButton,
} from "@/components/tiptap-ui/color-highlight-popover";
import { LinkPopover, LinkContent, LinkButton } from "@/components/tiptap-ui/link-popover";
import { HeadingDropdownMenu } from "@/components/tiptap-ui/heading-dropdown-menu";
import { ImageUploadButton } from "@/components/tiptap-ui/image-upload-button";
import { ListDropdownMenu } from "@/components/tiptap-ui/list-dropdown-menu";
import { BlockquoteButton } from "@/components/tiptap-ui/blockquote-button";
import { TextAlignButton } from "@/components/tiptap-ui/text-align-button";
import { CodeBlockButton } from "@/components/tiptap-ui/code-block-button";
import { UndoRedoButton } from "@/components/tiptap-ui/undo-redo-button";
import { MarkButton } from "@/components/tiptap-ui/mark-button";

// --- Icons ---
import { HighlighterIcon } from "@/components/tiptap-icons/highlighter-icon";
import { ArrowLeftIcon } from "@/components/tiptap-icons/arrow-left-icon";
import { LinkIcon } from "@/components/tiptap-icons/link-icon";

// --- Hooks ---
import { useCursorVisibility } from "@/hooks/use-cursor-visibility";
import { useWindowSize } from "@/hooks/use-window-size";
import { useMobile } from "@/hooks/use-mobile";

// --- Components ---
import { ThemeToggle } from "@/components/tiptap-templates/simple/theme-toggle";

// --- Lib ---
import { handleImageUpload, MAX_FILE_SIZE } from "@/lib/tiptap-utils";

// --- Styles ---
import "@/components/tiptap-templates/simple/simple-editor.scss";

import content from "@/components/tiptap-templates/simple/data/content.json";
import { useContent } from "@/hooks/use-content";
import { toast } from "sonner";

const MainToolbarContent = ({
    onHighlighterClick,
    onLinkClick,
    isMobile,
    onSave,
}: {
    onHighlighterClick: () => void;
    onLinkClick: () => void;
    isMobile: boolean;
    onSave: () => void;
}) => {
    return (
        <>
            <Spacer />

            <ToolbarGroup>
                <UndoRedoButton action="undo" />
                <UndoRedoButton action="redo" />
            </ToolbarGroup>

            <ToolbarSeparator />

            <ToolbarGroup>
                <HeadingDropdownMenu levels={[1, 2, 3, 4]} />
                <ListDropdownMenu types={["bulletList", "orderedList", "taskList"]} />
                <BlockquoteButton />
                <CodeBlockButton />
            </ToolbarGroup>

            <ToolbarSeparator />

            <ToolbarGroup>
                <MarkButton type="bold" />
                <MarkButton type="italic" />
                <MarkButton type="strike" />
                <MarkButton type="code" />
                <MarkButton type="underline" />
                {!isMobile ? <ColorHighlightPopover /> : <ColorHighlightPopoverButton onClick={onHighlighterClick} />}
                {!isMobile ? <LinkPopover /> : <LinkButton onClick={onLinkClick} />}
            </ToolbarGroup>

            <ToolbarSeparator />

            <ToolbarGroup>
                <MarkButton type="superscript" />
                <MarkButton type="subscript" />
            </ToolbarGroup>

            <ToolbarSeparator />

            <ToolbarGroup>
                <TextAlignButton align="left" />
                <TextAlignButton align="center" />
                <TextAlignButton align="right" />
                <TextAlignButton align="justify" />
            </ToolbarGroup>

            <ToolbarSeparator />

            <ToolbarGroup>
                <ImageUploadButton text="Add" />
            </ToolbarGroup>

            <Spacer />

            {isMobile && <ToolbarSeparator />}

            <ToolbarGroup>
                <ThemeToggle />
                <Button onClick={onSave}>Save</Button>
            </ToolbarGroup>
        </>
    );
};

const MobileToolbarContent = ({ type, onBack }: { type: "highlighter" | "link"; onBack: () => void }) => (
    <>
        <ToolbarGroup>
            <Button data-style="ghost" onClick={onBack}>
                <ArrowLeftIcon className="tiptap-button-icon" />
                {type === "highlighter" ? <HighlighterIcon className="tiptap-button-icon" /> : <LinkIcon className="tiptap-button-icon" />}
            </Button>
        </ToolbarGroup>

        <ToolbarSeparator />

        {type === "highlighter" ? <ColorHighlightPopoverContent /> : <LinkContent />}
    </>
);

export const useAutoSave = (editor: any, interval: number = 5000) => {
    const { updateContent } = useContent();
    const saveTimeout = React.useRef<NodeJS.Timeout | null>(null);
    const lastSavedAt = React.useRef<number>(Date.now());

    const debouncedSave = React.useCallback(() => {
        if (saveTimeout.current) clearTimeout(saveTimeout.current);

        saveTimeout.current = setTimeout(() => {
            if (editor && editor.getHTML) {
                const html = editor.getHTML();
                console.log("Auto-saving content:", html);
                updateContent(html);
                toast.message("Content saved");
                lastSavedAt.current = Date.now();
            }
        }, 3000); // 3 seconds debounce
    }, [editor, updateContent]);

    React.useEffect(() => {
        if (!editor) return;

        const handleChange = () => {
            console.log("Editor content changed manually.");
            debouncedSave();
        };

        editor.on("update", handleChange);

        // Optional: fallback periodic save (every 5s)
        const periodicSave = setInterval(() => {
            if (editor && editor.getHTML && Date.now() - lastSavedAt.current > interval) {
                const html = editor.getHTML();
                updateContent(html);
                lastSavedAt.current = Date.now();
            }
        }, interval);

        return () => {
            editor.off("update", handleChange);
            clearInterval(periodicSave);
            if (saveTimeout.current) clearTimeout(saveTimeout.current);
        };
    }, [editor, interval, debouncedSave, updateContent]);
};

export function SimpleEditor() {
    const isMobile = useMobile();
    const windowSize = useWindowSize();
    const [mobileView, setMobileView] = React.useState<"main" | "highlighter" | "link">("main");
    const toolbarRef = React.useRef<HTMLDivElement>(null);

    const editor = useEditor({
        immediatelyRender: false,
        editorProps: {
            attributes: {
                autocomplete: "off",
                autocorrect: "off",
                autocapitalize: "off",
                "aria-label": "Main content area, start typing to enter text.",
            },
        },
        extensions: [
            StarterKit,
            TextAlign.configure({ types: ["heading", "paragraph"] }),
            Underline,
            TaskList,
            TaskItem.configure({ nested: true }),
            Highlight.configure({ multicolor: true }),
            Image,
            Typography,
            Superscript,
            Subscript,

            Selection,
            ImageUploadNode.configure({
                accept: "image/*",
                maxSize: MAX_FILE_SIZE,
                limit: 3,
                upload: handleImageUpload,
                onError: (error) => console.error("Upload failed:", error),
            }),
            TrailingNode,
            Link.configure({ openOnClick: false }),
        ],
        content: content,
    });
    const { content: editorContent, updateContent: updateContent } = useContent();
    const onSave = () => {
        const contentJSON = editor?.getJSON();
        if (contentJSON) {
            updateContent(editor?.getJSON());
            toast.success("Content saved successfully!");
            console.log(editorContent);
        }
    };
    useAutoSave(editor, 5000);

    const bodyRect = useCursorVisibility({
        editor,
        overlayHeight: toolbarRef.current?.getBoundingClientRect().height ?? 0,
    });

    React.useEffect(() => {
        if (!isMobile && mobileView !== "main") {
            setMobileView("main");
        }
    }, [isMobile, mobileView]);

    return (
        <EditorContext.Provider value={{ editor }}>
            <Toolbar
                ref={toolbarRef}
                style={
                    isMobile
                        ? {
                              bottom: `calc(100% - ${windowSize.height - bodyRect.y}px)`,
                          }
                        : {}
                }
            >
                {mobileView === "main" ? (
                    <MainToolbarContent
                        onHighlighterClick={() => setMobileView("highlighter")}
                        onLinkClick={() => setMobileView("link")}
                        isMobile={isMobile}
                        onSave={onSave}
                    />
                ) : (
                    <MobileToolbarContent
                        type={mobileView === "highlighter" ? "highlighter" : "link"}
                        onBack={() => setMobileView("main")}
                    />
                )}
            </Toolbar>

            <div className="content-wrapper">
                <EditorContent editor={editor} role="presentation" className="simple-editor-content overflow-y-auto h-[75vh] w-[45vw]" />
            </div>
        </EditorContext.Provider>
    );
}
