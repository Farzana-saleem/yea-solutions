import React, { useState } from "react";

export const  TaskFormPage =()=> {
  const [mode, setMode] = useState<"login" | "register" | "task">("register");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    title: "",
    description: "",
    deadline: ""
  });
  const [message, setMessage] = useState("");

  const handleChange = (e)=> {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let endpoint = "";
      let body = {};

      if (mode === "register") {
        endpoint = "/api/auth/register";
        body = { email: formData.email, password: formData.password };
      } else if (mode === "login") {
        endpoint = "/api/auth/login";
        body = { email: formData.email, password: formData.password };
      } else {
        endpoint = "/api/tasks";
        body = {
          title: formData.title,
          description: formData.description,
          deadline: formData.deadline,
        };
      }

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      setMessage(data.message || "Success");
      setFormData({ email: "", password: "", title: "", description: "", deadline: "" });
    } catch (error) {
      setMessage("API Error");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4 space-y-6">
      <div className="space-x-2">
        <button onClick={() => setMode("register")} className="px-4 py-2 bg-blue-500 text-white rounded">
          Register
        </button>
        <button onClick={() => setMode("login")} className="px-4 py-2 bg-green-500 text-white rounded">
          Login
        </button>
        <button onClick={() => setMode("task")} className="px-4 py-2 bg-purple-500 text-white rounded">
          Create Task
        </button>
      </div>

      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded p-6 w-full max-w-md space-y-4">
        {(mode === "register" || mode === "login") && (
          <>
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="w-full border p-2 rounded" />
            <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" className="w-full border p-2 rounded" />
          </>
        )}

        {mode === "task" && (
          <>
            <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Task Title" className="w-full border p-2 rounded" />
            <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" className="w-full border p-2 rounded" />
            <input type="date" name="deadline" value={formData.deadline} onChange={handleChange} className="w-full border p-2 rounded" />
          </>
        )}

        <button type="submit" className="w-full bg-black text-white p-2 rounded">
          Submit
        </button>

        {message && <p className="text-center text-gray-700">{message}</p>}
      </form>
    </div>
  );
}