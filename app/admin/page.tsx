"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  name: string | null;
  email: string;
  username: string | null;
  createdAt: string;
}

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState<string | null>(null);
  const [newUsername, setNewUsername] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    } else if (status === "authenticated") {
      loadUsers();
    }
  }, [status, router]);

  const loadUsers = async () => {
    try {
      const res = await fetch("/api/admin/users");
      const data = await res.json();
      if (data.ok) {
        setUsers(data.users);
      }
    } catch (error) {
      console.error("Failed to load users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateUsername = async (userId: string) => {
    if (!newUsername.trim()) {
      alert("Please enter a username");
      return;
    }

    try {
      const res = await fetch("/api/admin/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, username: newUsername.trim() }),
      });

      const data = await res.json();
      if (data.ok) {
        alert("Username updated successfully!");
        setEditingUser(null);
        setNewUsername("");
        loadUsers();
      } else {
        alert(data.error || "Failed to update username");
      }
    } catch (error) {
      console.error("Error updating username:", error);
      alert("Failed to update username");
    }
  };

  const handleDeleteUser = async (userId: string, email: string) => {
    if (!confirm(`Are you sure you want to delete user ${email}?`)) {
      return;
    }

    try {
      const res = await fetch("/api/admin/users", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });

      const data = await res.json();
      if (data.ok) {
        alert("User deleted successfully!");
        loadUsers();
      } else {
        alert(data.error || "Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user");
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold mb-6">User Management</h1>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Name</th>
                  <th className="text-left py-3 px-4">Email</th>
                  <th className="text-left py-3 px-4">Username</th>
                  <th className="text-left py-3 px-4">Created</th>
                  <th className="text-left py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">{user.name || "-"}</td>
                    <td className="py-3 px-4">{user.email}</td>
                    <td className="py-3 px-4">
                      {editingUser === user.id ? (
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={newUsername}
                            onChange={(e) => setNewUsername(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                            placeholder="username"
                            className="border rounded px-2 py-1 text-sm"
                          />
                          <button
                            onClick={() => handleUpdateUsername(user.id)}
                            className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => {
                              setEditingUser(null);
                              setNewUsername("");
                            }}
                            className="bg-gray-600 text-white px-3 py-1 rounded text-sm hover:bg-gray-700"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <span className={user.username ? "" : "text-red-500"}>
                          {user.username || "Not set"}
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        {!user.username && editingUser !== user.id && (
                          <button
                            onClick={() => {
                              setEditingUser(user.id);
                              setNewUsername("");
                            }}
                            className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                          >
                            Set Username
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteUser(user.id, user.email)}
                          className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {users.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No users found
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
