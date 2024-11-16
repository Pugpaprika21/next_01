"use client"

import React from 'react';
export default function Form2Component({ formData, onChange }) {
    return (
        <div>
            <input
                type="text"
                id="age"
                value={formData.age}
                onChange={onChange}
                placeholder="Age"
                style={{ borderBlockColor: "red" }}
            />
            <input
                type="text"
                id="gender"
                value={formData.gender}
                onChange={onChange}
                placeholder="Gender"
                style={{ borderBlockColor: "red" }}
            />
        </div>
    );
}
