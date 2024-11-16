"use client"

import React from 'react';
export default function Form3Component({ formData, onFileChange }) {
    return (
        <div>
            <input
                type="file"
                id="file"
                onChange={onFileChange}
                multiple={true}  
            />
            {formData.files && formData.files.length > 0 && (
                <div>
                    <p>Files selected:</p>
                    <ul>
                        {formData.files.map((file, index) => (
                            <li key={index}>{file.name}</li>  
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
