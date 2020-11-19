import React, { useMemo } from 'react'
import { useDropzone } from 'react-dropzone'

const whitebox = {
    "padding": "13px",
    "border": "1px",
    "borderStyle": "Solid",
    "borderColor": "#eeeeee",
    "borderRadius": "3px",
    "width": "90%",
    "display": "inline-block"
};

const box = {
    "flex": "1",
    "display": "flex",
    "flexDirection": "column",
    "alignItems": "center",
    "padding": "10px",
    "borderWidth": "2px",
    "borderRadius": "2px",
    "borderStyle": "dashed",
    "borderColor": "#eeeeee",
    "backgroundColor": "#fafafa",
    "color": "#bdbdbd",
    "outline": "none",
    "transition": "border .24s ease-in-out"
};

const activeStyle = {
    borderColor: '#ff1744'
}

const MyDropzone = ({ swaggerRead }) => {
    const onDrop = (acceptedFiles) => {
        swaggerRead({target: {files: acceptedFiles}});
    }
    const {
        open,
        getRootProps,
        getInputProps,
        acceptedFiles,
        isDragActive
    } = useDropzone({
        noClick: true,
        onDrop
    });
    const boxstyle = useMemo(() => ({
        ...box,
        ...(isDragActive ? activeStyle : {})
    }), [
        isDragActive
	]);

    const fileSize = acceptedFiles.map(file => (
        <li key={file.path}>
            {file.path} - {file.size} bytes
        </li>
    ));
	// const handleClick = () => {
	// 	alert('hi')
	// }
    return (
        <section className="container" style={whitebox} onClick={open}>
            <div style={boxstyle} {...getRootProps()}>
                <input {...getInputProps()}/>
                <p>Drag 'n' drop some files here, or click to select files</p>
                {/* <button type="button" onClick={open}>
                    Open File Dialog
                </button> */}
            </div>
            {/* <aside>
                <ul>{fileSize}</ul>
            </aside> */}
        </section>
    );
}

export default MyDropzone;
