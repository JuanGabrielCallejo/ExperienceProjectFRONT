import React, { useState } from 'react';

function Camara() {
    const [source, setSource] = useState(""); const handleCapture = (target) => {
        if (target.files) {
            if (target.files.length !== 0) {
                const file = target.files[0];
                const newUrl = URL.createObjectURL(file);
                setSource(newUrl);
            }
        }
    }; return (
        <div >

            <h5>Capture your image</h5>
            {source &&

                <img src={source} alt={"snap"} ></img>
            }
            <input
                accept="image/*"

                id="icon-button-file"
                type="file"
                capture="environment"
                onChange={(e) => handleCapture(e.target)}
            />
            <label htmlFor="icon-button-file">

            </label>

        </div>
    );
}
export default Camara;