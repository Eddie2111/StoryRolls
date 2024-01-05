'use client'
import React, { useState, useRef, useMemo } from 'react';
const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });
import dynamic from 'next/dynamic';

interface EditorProps {
    placeholder: string;
    value: string;
    onChange: (newContent: string) => void;
  }

export default function Editor (
    {   placeholder,
        value,
        onChange
    } : EditorProps
    ) {
	const editor = useRef(null);
	const [content, setContent] = useState('');
	const config = useMemo(() => ({
        readonly: false,
        placeholder: placeholder || 'Start typings...'
    }), [placeholder]);
	return (
		<JoditEditor
            ref={(el) => {
                // Assign the JoditEditor instance to the ref
                editor.current = el;
                // Forward the ref to the parent component if provided
                if (ref) {
                if (typeof ref === 'function') {
                    ref(el);
                } else {
                    ref.current = el;
                }
                }
            }}
            value={value}
            config={config}
            tabIndex={1} // tabIndex of textarea
            onBlur={newContent => onChange(newContent)} // preferred to use only this option to update the content for performance reasons
            onChange={newContent => {}}
            className='text-black bg-slate-600'
		/>
	);
};

