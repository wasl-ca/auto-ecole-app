// src/components/common/SearchBar.jsx
import { Input } from "@/components/ui/input";

export default function SearchBar({ placeholder, value, onChange }) {
  return (
    <div className="mb-4">
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full max-w-md"
      />
    </div>
  );
}
