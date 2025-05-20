import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useAppContext } from "@/context/AppContext";

const api = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  headers: { "Content-Type": "application/json" },
});

const AddStudentModal = ({ open, onOpenChange }) => {
  const { token } = useAppContext();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    dateOfBirth: "",
    cin: "",
    examType: "code",
    prefferredExamDate: "",
    prefferredExamLocation: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify(formData),
      };

      const studentRes = await api.post("/students", config);
      if (studentRes.status === 201) {
        alert("Student added successfully!");
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          address: "",
          dateOfBirth: "",
          cin: "",
          examType: "code",
          prefferredExamDate: "",
          prefferredExamLocation: "",
        });
      } else {
        alert("Failed to add student");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg" >
        <DialogHeader>
          <DialogTitle>Add Student</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-3">
          <Input
            name="fullName"
            placeholder="Full Name"
            onChange={handleChange}
            required
          />
          <Input
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
          />
          <Input name="phone" placeholder="Phone" onChange={handleChange} />
          <Input name="address" placeholder="Address" onChange={handleChange} />
          <Input
            name="dateOfBirth"
            type="date"
            onChange={handleChange}
            required
          />
          <Input
            name="cin"
            placeholder="CIN"
            onChange={handleChange}
            required
          />
          <select
            name="examType"
            className="w-full border rounded p-2"
            onChange={handleChange}
          >
            <option value="code">Code</option>
            <option value="conduite">Conduite</option>
            <option value="manoeuvre">Manoeuvre</option>
          </select>
          <Input
            name="prefferredExamDate"
            type="date"
            onChange={handleChange}
          />
          <Input
            name="prefferredExamLocation"
            placeholder="Preferred Location"
            onChange={handleChange}
          />
          <div className="flex justify-end">
            <Button type="submit">Add</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddStudentModal;
