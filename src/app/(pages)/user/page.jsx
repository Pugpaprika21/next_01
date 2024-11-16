"use client";

import React, { useState, useEffect } from "react";
import Form1Component from "./components/Form1Component";
import Form2Component from "./components/Form2Component";
import Form3Component from "./components/Form3Component";

const formDataProps = {
    tab1: {
        name: "",
        email: "",
        age: "",
        gender: "",
        files: [],
        lovCat1: [],
        lovCat2: [],
        lovCat3: [],
        lovCat4: [],
    },
};

export default function UserPage() {
    const [formData, setFormData] = useState(formDataProps);

    const generalFormHandlers = {
        handleChange: function (e) {
            const { id, value } = e.target;
            setFormData((prevData) => ({
                ...prevData,
                tab1: { ...prevData.tab1, [id]: value },
            }));
        },
        handleFileChange: function (e) {
            const files = Array.from(e.target.files);
            setFormData((prevData) => ({
                ...prevData,
                tab1: { ...prevData.tab1, files: files },
            }));
        },
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form data 1:", formData);

        setFormData({
            tab1: {
                name: "",
                email: "",
                age: "",
                gender: "",
                files: [],
            },
        });
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <Form1Component formData={formData.tab1} onChange={generalFormHandlers.handleChange} />
                <Form2Component formData={formData.tab1} onChange={generalFormHandlers.handleChange} />
                <Form3Component formData={formData.tab1} onFileChange={generalFormHandlers.handleFileChange} />
                <button type="submit">Submit</button>
            </form>
        </>
    );
}
