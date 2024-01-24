'use client';
import React, {useRef, useMemo} from 'react';
const JoditEditor = dynamic(() => import('jodit-react'), {ssr: false});
import dynamic from 'next/dynamic';

interface EditorProps {
  placeholder: string;
  value: string;
  onChange: (newContent: string) => void;
}

export default function Editor({placeholder, value, onChange}: EditorProps) {
  const editor = useRef(null);
  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: placeholder || 'Start typings...',
    }),
    [placeholder],
  );
  return (
    <JoditEditor
      ref={editor}
      value={value}
      config={config}
      onBlur={(newContent) => onChange(newContent)} // preferred to use only this option to update the content for performance reasons
      onChange={(newContent) => {}}
      className='text-black bg-slate-600'
    />
  );
}
