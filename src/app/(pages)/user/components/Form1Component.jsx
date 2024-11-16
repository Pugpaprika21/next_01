"use client"

import React from 'react';
export default function Form1Component({ formData, onChange }) {
    return (
        <div className='container'>
            <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1">@</span>
                <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={onChange}
                    placeholder="Name"
                    style={{ borderBlockColor: "blue" }}
                />
            </div>
            <input
                type="text"
                id="email"
                value={formData.email}
                onChange={onChange}
                placeholder="Email"
                style={{ borderBlockColor: "blue" }}
            />

        </div>     
    );
}
