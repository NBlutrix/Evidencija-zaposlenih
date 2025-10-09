import React, { useState } from "react";
import useFetch from "../hooks/useFetch";
import usePost from "../hooks/usePost";
import useDelete from "../hooks/useDelete";
import Input from "../components/Input";
import Button from "../components/Button";

const DepartmentsPage = () => {
  const { data: departments, loading, error } = useFetch("/departments");
  const { postData } = usePost();
  const { deleteData } = useDelete();

  const [name, setName] = useState("");

  const handleAdd = async () => {
    const res = await postData("/departments", { name });
    if (res) window.location.reload(); // kasnije ćemo zameniti sa re-renderom
  };

  const handleDelete = async (id) => {
    await deleteData(`/departments/${id}`);
    window.location.reload();
  };

  if (loading) return <p>Učitavanje...</p>;
  if (error) return <p>Greška pri učitavanju departmana.</p>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Departmani</h1>

      <div className="flex gap-2 mb-4">
        <Input
          label="Novi departman"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button onClick={handleAdd}>Dodaj</Button>
      </div>

      <ul className="list-disc pl-5">
        {departments.map((d) => (
          <li key={d.id} className="flex justify-between">
            <span>{d.name}</span>
            <Button onClick={() => handleDelete(d.id)} className="bg-red-500 text-white">
              Obriši
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DepartmentsPage;
