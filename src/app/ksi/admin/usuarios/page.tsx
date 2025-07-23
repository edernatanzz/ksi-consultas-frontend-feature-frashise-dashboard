"use client";
import React, { useState } from 'react';
import UserManagementTemplate from '@/components/template/UserManagementTemplate/UserManagementTemplate';
import { User } from '@/types/user';
import { MOCK_USERS } from '@/constants/users';
import { filterUsers } from '@/utils/user';

const Users: React.FC = () => {
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterProfile, setFilterProfile] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');

  const filteredUsers = filterUsers(
    MOCK_USERS,
    searchTerm,
    filterProfile,
    filterStatus,
    filterDepartment
  );

  const handleSelectUser = (userId: string) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSelectAll = () => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredUsers.map(user => user.id));
    }
  };

  const handleViewActivity = (user: User) => {
    console.log('View activity:', user);
  };

  const handleView = (user: User) => {
    console.log('View user:', user);
  };

  const handleEdit = (user: User) => {
    console.log('Edit user:', user);
  };

  const handleClone = (user: User) => {
    console.log('Clone user:', user);
  };

  const handleCreate = () => {
    console.log('Create new user');
  };

  const handleExport = () => {
    console.log('Export users');
  };

  const handleBulkActivate = () => {
    console.log('Activate users:', selectedUsers);
  };

  const handleBulkDeactivate = () => {
    console.log('Deactivate users:', selectedUsers);
  };

  const handleBulkResetPassword = () => {
    console.log('Reset password for users:', selectedUsers);
  };

  const handleBulkDelete = () => {
    console.log('Delete users:', selectedUsers);
  };

  return (
    <UserManagementTemplate
      users={filteredUsers}
      selectedUsers={selectedUsers}
      searchTerm={searchTerm}
      filterProfile={filterProfile}
      filterStatus={filterStatus}
      filterDepartment={filterDepartment}
      viewMode={viewMode}
      onSearchChange={setSearchTerm}
      onProfileChange={setFilterProfile}
      onStatusChange={setFilterStatus}
      onDepartmentChange={setFilterDepartment}
      onViewModeChange={setViewMode}
      onSelectUser={handleSelectUser}
      onSelectAll={handleSelectAll}
      onViewActivity={handleViewActivity}
      onView={handleView}
      onEdit={handleEdit}
      onClone={handleClone}
      onCreate={handleCreate}
      onExport={handleExport}
      onBulkActivate={handleBulkActivate}
      onBulkDeactivate={handleBulkDeactivate}
      onBulkResetPassword={handleBulkResetPassword}
      onBulkDelete={handleBulkDelete}
    />
  );
};

export default Users;