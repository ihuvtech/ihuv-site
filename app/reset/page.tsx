"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Portfolio {
  id: string;
  name: string;
  slug: string;
  data: any;
  published: boolean;
  updatedAt: string;
}

interface User {
  id: string;
  name: string | null;
  email: string;
  username: string | null;
  image: string | null;
  createdAt: string;
  portfolios?: Portfolio[];
  _count: {
    portfolios: number;
  };
}

export default function AdminPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<User>>({});
  const [expandedUser, setExpandedUser] = useState<string | null>(null);
  const [editingPortfolio, setEditingPortfolio] = useState<string | null>(null);
  const [portfolioEditData, setPortfolioEditData] = useState<string>("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/admin/users");
      const data = await res.json();
      
      if (data.users) {
        // Fetch portfolios for each user
        const usersWithPortfolios = await Promise.all(
          data.users.map(async (user: User) => {
            const convertedImage = user.image ? convertBlobUrlToApiRoute(user.image) : null;
            
            // Fetch user's portfolios
            let portfolios: Portfolio[] = [];
            if (user.username) {
              try {
                const portfolioRes = await fetch(`/api/portfolio/${user.username}`);
                if (portfolioRes.ok) {
                  const portfolioData = await portfolioRes.json();
                  portfolios = portfolioData.portfolios || [];
                }
              } catch (err) {
                // User might not have portfolios
              }
            }
            
            return {
              ...user,
              image: convertedImage,
              portfolios,
            };
          })
        );
        setUsers(usersWithPortfolios);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Helper function to convert blob URL to API route
  const convertBlobUrlToApiRoute = (url: string) => {
    if (!url) return url;
    
    // If it's already an API route, return as is
    if (url.startsWith('/api/image/')) return url;
    
    // If it's a blob URL, convert it
    if (url.includes('blob.vercel-storage.com')) {
      const match = url.match(/blob\.vercel-storage\.com\/(.+)/);
      if (match) {
        return `/api/image/${match[1]}`;
      }
    }
    
    return url;
  };

  const handleReset = async () => {
    if (!confirm("Are you sure you want to delete ALL user data? This cannot be undone!")) {
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/admin/reset", {
        method: "POST",
      });

      const data = await res.json();

      if (data.ok) {
        alert("All user data deleted successfully!");
        fetchUsers();
      } else {
        alert(data.error || "Failed to delete data");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to delete data");
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (user: User) => {
    setEditingUser(user.id);
    setEditForm({
      name: user.name,
      email: user.email,
      username: user.username,
      image: user.image,
    });
  };

  const cancelEdit = () => {
    setEditingUser(null);
    setEditForm({});
  };

  const saveEdit = async (userId: string) => {
    try {
      const res = await fetch("/api/admin/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, ...editForm }),
      });

      const data = await res.json();
      if (data.ok) {
        alert("User updated successfully!");
        fetchUsers();
        cancelEdit();
      } else {
        alert(data.error || "Failed to update user");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to update user");
    }
  };

  const deleteUser = async (userId: string) => {
    if (!confirm("Are you sure you want to delete this user?")) {
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
        fetchUsers();
      } else {
        alert(data.error || "Failed to delete user");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to delete user");
    }
  };

  const startEditPortfolio = (portfolio: Portfolio) => {
    setEditingPortfolio(portfolio.id);
    setPortfolioEditData(JSON.stringify(portfolio.data, null, 2));
  };

  const savePortfolio = async (portfolioId: string, portfolioName: string, portfolioSlug: string) => {
    try {
      const parsedData = JSON.parse(portfolioEditData);
      
      const res = await fetch("/api/portfolio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          portfolioId,
          portfolioName,
          portfolioSlug,
          data: parsedData,
        }),
      });

      const data = await res.json();
      if (data.ok) {
        alert("Portfolio updated successfully!");
        setEditingPortfolio(null);
        setPortfolioEditData("");
        fetchUsers();
      } else {
        alert(data.error || "Failed to update portfolio");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Invalid JSON or failed to update portfolio");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
            <p className="text-gray-600 mt-1">Manage all users and their data</p>
          </div>
          <button
            onClick={handleReset}
            disabled={loading}
            className="bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            {loading ? "Deleting..." : "🗑️ Delete All Data"}
          </button>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Username
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Image
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Portfolios
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                      No users found
                    </td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <React.Fragment key={user.id}>
                      <tr className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          {editingUser === user.id ? (
                            <input
                              type="text"
                              value={editForm.name || ""}
                              onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                              className="border rounded px-2 py-1 w-full"
                              placeholder="Name"
                            />
                          ) : (
                            <div className="text-sm font-medium text-gray-900">{user.name || "—"}</div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {editingUser === user.id ? (
                            <input
                              type="email"
                              value={editForm.email || ""}
                              onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                              className="border rounded px-2 py-1 w-full"
                              placeholder="Email"
                            />
                          ) : (
                            <div className="text-sm text-gray-900">{user.email}</div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {editingUser === user.id ? (
                            <input
                              type="text"
                              value={editForm.username || ""}
                              onChange={(e) => setEditForm({ ...editForm, username: e.target.value })}
                              className="border rounded px-2 py-1 w-full"
                              placeholder="Username"
                            />
                          ) : (
                            <div className="text-sm text-gray-900">{user.username || "—"}</div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {editingUser === user.id ? (
                            <input
                              type="text"
                              value={editForm.image || ""}
                              onChange={(e) => setEditForm({ ...editForm, image: e.target.value })}
                              className="border rounded px-2 py-1 w-full"
                              placeholder="Image URL"
                            />
                          ) : user.image ? (
                            <img src={user.image} alt="" className="h-8 w-8 rounded-full" />
                          ) : (
                            <div className="text-sm text-gray-400">—</div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => setExpandedUser(expandedUser === user.id ? null : user.id)}
                            className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800 hover:bg-blue-200 cursor-pointer"
                          >
                            {user._count.portfolios} {expandedUser === user.id ? '▼' : '▶'}
                          </button>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(user.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          {editingUser === user.id ? (
                            <div className="flex gap-2 justify-end">
                              <button
                                onClick={() => saveEdit(user.id)}
                                className="text-green-600 hover:text-green-900"
                              >
                                Save
                              </button>
                              <button
                                onClick={cancelEdit}
                                className="text-gray-600 hover:text-gray-900"
                              >
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <div className="flex gap-2 justify-end">
                              <button
                                onClick={() => startEdit(user)}
                                className="text-indigo-600 hover:text-indigo-900"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => deleteUser(user.id)}
                                className="text-red-600 hover:text-red-900"
                              >
                                Delete
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                      {expandedUser === user.id && user.portfolios && user.portfolios.length > 0 && (
                        <tr>
                          <td colSpan={7} className="px-6 py-4 bg-gray-900">
                            <div className="space-y-4">
                              <div className="flex items-center justify-between mb-4">
                                <h4 className="font-mono text-green-400 text-sm">
                                  ~/admin/portfolios/{user.username || user.email}
                                </h4>
                                <button
                                  onClick={() => setExpandedUser(null)}
                                  className="text-gray-400 hover:text-white text-xs font-mono"
                                >
                                  [ESC] Close
                                </button>
                              </div>
                              {user.portfolios.map((portfolio) => (
                                <div key={portfolio.id} className="border border-gray-700 rounded bg-gray-800">
                                  {/* Terminal Header */}
                                  <div className="bg-gray-900 border-b border-gray-700 px-4 py-2 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                      <div className="flex gap-1.5">
                                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                      </div>
                                      <span className="font-mono text-xs text-gray-400">
                                        vim ~/portfolios/{portfolio.slug}.json
                                      </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <span className="font-mono text-xs text-gray-500">
                                        Modified: {new Date(portfolio.updatedAt).toLocaleString()}
                                      </span>
                                      {editingPortfolio === portfolio.id ? (
                                        <>
                                          <button
                                            onClick={() => savePortfolio(portfolio.id, portfolio.name, portfolio.slug)}
                                            className="font-mono text-xs text-green-400 hover:text-green-300 px-2 py-1 border border-green-600 rounded"
                                          >
                                            :wq [Save & Quit]
                                          </button>
                                          <button
                                            onClick={() => {
                                              setEditingPortfolio(null);
                                              setPortfolioEditData("");
                                            }}
                                            className="font-mono text-xs text-red-400 hover:text-red-300 px-2 py-1 border border-red-600 rounded"
                                          >
                                            :q! [Quit]
                                          </button>
                                        </>
                                      ) : (
                                        <button
                                          onClick={() => startEditPortfolio(portfolio)}
                                          className="font-mono text-xs text-blue-400 hover:text-blue-300 px-2 py-1 border border-blue-600 rounded"
                                        >
                                          i [Insert Mode]
                                        </button>
                                      )}
                                    </div>
                                  </div>
                                  
                                  {/* Terminal Content */}
                                  <div className="p-4 bg-gray-900">
                                    {editingPortfolio === portfolio.id ? (
                                      <div className="relative">
                                        <div className="absolute top-2 left-2 font-mono text-xs text-gray-600 select-none pointer-events-none">
                                          {portfolioEditData.split('\n').map((_, i) => (
                                            <div key={i} className="leading-5">{i + 1}</div>
                                          ))}
                                        </div>
                                        <textarea
                                          value={portfolioEditData}
                                          onChange={(e) => setPortfolioEditData(e.target.value)}
                                          className="w-full bg-black text-green-400 font-mono text-xs leading-5 focus:outline-none focus:ring-2 focus:ring-green-600 rounded pl-12 pr-4 py-2 min-h-[400px] resize-y"
                                          spellCheck={false}
                                          style={{
                                            tabSize: 2,
                                            fontFamily: "'Courier New', Courier, monospace"
                                          }}
                                        />
                                        <div className="mt-2 flex items-center justify-between text-xs font-mono">
                                          <span className="text-yellow-400">
                                            -- INSERT --
                                          </span>
                                          <span className="text-gray-500">
                                            {portfolioEditData.split('\n').length} lines | {portfolioEditData.length} chars
                                          </span>
                                        </div>
                                      </div>
                                    ) : (
                                      <div className="relative">
                                        <div className="absolute top-2 left-2 font-mono text-xs text-gray-600 select-none">
                                          {JSON.stringify(portfolio.data, null, 2).split('\n').map((_, i) => (
                                            <div key={i} className="leading-5">{i + 1}</div>
                                          ))}
                                        </div>
                                        <pre className="bg-black text-green-400 font-mono text-xs leading-5 rounded pl-12 pr-4 py-2 overflow-auto max-h-[400px]">
                                          {JSON.stringify(portfolio.data, null, 2)}
                                        </pre>
                                        <div className="mt-2 flex items-center justify-between text-xs font-mono">
                                          <span className="text-gray-500">
                                            -- NORMAL MODE --
                                          </span>
                                          <span className="text-gray-500">
                                            {JSON.stringify(portfolio.data, null, 2).split('\n').length} lines | Read-only
                                          </span>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6 text-center">
          <a href="/" className="text-sm text-gray-600 hover:text-gray-900">
            ← Back to home
          </a>
        </div>
      </div>
    </div>
  );
}
