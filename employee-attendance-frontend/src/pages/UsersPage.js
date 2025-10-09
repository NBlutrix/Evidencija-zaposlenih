import React, { useState } from "react";
import Modal from "../components/Modal";
import UserForm from "../components/UserForm";
import useFetch from "../hooks/useFetch";
import useDelete from "../hooks/useDelete";
import Button from "../components/Button";

const UsersPage = () => {
  const [openModal, setOpenModal] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  const { data: users, loading, error } = useFetch("/users");
  const { deleteData } = useDelete();

  const handleDelete = async (id) => {
    if (window.confirm("Da li želiš da obrišeš ovog korisnika?")) {
      await deleteData(`/users/${id}`);
      window.location.reload();
    }
  };

  if (loading) return <p>Učitavanje korisnika...</p>;
  if (error) return <p>Greška pri učitavanju korisnika.</p>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Korisnici</h1>

      {/* Dugme za dodavanje korisnika — samo admin */}
      {user.role === "admin" && (
        <Button
          onClick={() => setOpenModal(true)}
          className="bg-blue-600 text-white mb-4"
        >
          + Dodaj korisnika
        </Button>
      )}

      {/* Modal za dodavanje korisnika */}
      <Modal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        title="Dodaj korisnika"
      >
        <UserForm
          onClose={() => setOpenModal(false)}
          onSuccess={() => window.location.reload()}
        />
      </Modal>

      {/* Tabela korisnika */}
      <table className="min-w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Ime</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Uloga</th>
            <th className="border p-2">Odeljenje</th>
            {user.role === "admin" && <th className="border p-2">Akcije</th>}
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td className="border p-2">{u.name}</td>
              <td className="border p-2">{u.email}</td>
              <td className="border p-2 capitalize">{u.role}</td>
              <td className="border p-2">
                {u.department?.name || "Nema odeljenje"}
              </td>
              {user.role === "admin" && (
                <td className="border p-2">
                  <Button
                    className="bg-red-500 text-white"
                    onClick={() => handleDelete(u.id)}
                  >
                    Obriši
                  </Button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersPage;
