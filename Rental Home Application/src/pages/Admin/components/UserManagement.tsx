import React from 'react';
import { format } from 'date-fns';
import { CheckCircle, XCircle, Shield, User, Home } from 'lucide-react';
import { useUsers } from '../hooks/useUsers';
import { toast } from 'react-hot-toast';

const ROLE_ICONS = {
  tenant: User,
  owner: Home,
  admin: Shield
};

const ROLE_COLORS = {
  tenant: 'text-blue-600',
  owner: 'text-green-600',
  admin: 'text-purple-600'
};

export default function UserManagement() {
  const { users, loading, error, updateUserRole, toggleUserVerification } = useUsers();
  const [selectedUser, setSelectedUser] = React.useState<string | null>(null);

  const handleRoleChange = async (userId: string, newRole: 'tenant' | 'owner' | 'admin') => {
    try {
      await updateUserRole(userId, newRole);
      toast.success('User role updated successfully');
    } catch (error) {
      toast.error('Failed to update user role');
    }
  };

  const handleVerificationToggle = async (userId: string, isVerified: boolean) => {
    try {
      await toggleUserVerification(userId, isVerified);
      toast.success(`User ${isVerified ? 'verified' : 'unverified'} successfully`);
    } catch (error) {
      toast.error('Failed to update user verification');
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">User Management</h2>
        <div className="animate-pulse space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 bg-gray-100 rounded" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <p className="text-red-600">Error loading users</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">User Management</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map((user) => {
              const RoleIcon = ROLE_ICONS[user.role];
              return (
                <tr key={user.id}>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{user.full_name}</div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <RoleIcon className={`h-4 w-4 mr-2 ${ROLE_COLORS[user.role]}`} />
                      <select
                        value={user.role}
                        onChange={(e) => handleRoleChange(user.id, e.target.value as any)}
                        className="text-sm text-gray-900 border-gray-300 rounded-md"
                      >
                        <option value="tenant">Tenant</option>
                        <option value="owner">Owner</option>
                        <option value="admin">Admin</option>
                      </select>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleVerificationToggle(user.id, !user.is_verified)}
                      className={`flex items-center ${
                        user.is_verified ? 'text-green-600' : 'text-gray-400'
                      }`}
                    >
                      {user.is_verified ? (
                        <CheckCircle className="h-5 w-5" />
                      ) : (
                        <XCircle className="h-5 w-5" />
                      )}
                    </button>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    {format(new Date(user.created_at), 'MMM d, yyyy')}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
} 