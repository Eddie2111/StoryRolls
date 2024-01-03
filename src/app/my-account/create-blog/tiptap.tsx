'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

const Tiptap = ({
  description,
  onChange
}:{
  description: string,
  onChange: (richText: string) => void
}) => {
  const editor = useEditor({
    extensions: [StarterKit.configure()],
    content: description,
    editorProps: {
      attributes: {
        class: 'rounded-lg border-2 border-gray-200'
      }
    },
    onUpdate({editor}){
      onChange(editor.getHTML())
      console.log(editor.getHTML())
    }
    
  })

  return (
    <EditorContent editor={editor} />
  )
}

export default Tiptap