import React, { useState } from 'react';
import ReactQuill from 'react-quill';

export default function Test() {
    const [value, setValue] = useState('');

    return <ReactQuill theme="snow" value={value} onChange={setValue} />;
}