import { useEffect, useMemo } from 'react';
import { useEmployeeStore } from '@/lib/store/useEmployeeStore';

// Hook to load employees only once
export const useEmployees = () => {
  const { employees, isLoading, hasLoaded, fetchEmployees } = useEmployeeStore();

  // Load employees only if we haven't loaded them before
  useEffect(() => {
    if (!hasLoaded && !isLoading) {
      fetchEmployees();
    }
  }, [hasLoaded, isLoading, fetchEmployees]);

  return {
    employees,
    isLoading,
    hasLoaded
  };
};

// Hook for searching employees
export const useEmployeeSearch = (searchTerm: string) => {
  const { employees } = useEmployeeStore();

  // Filter employees based on search term
  const filteredEmployees = useMemo(() => {
    if (!searchTerm.trim()) {
      return employees;
    }

    const search = searchTerm.toLowerCase();
    
    return employees.filter((employee) => {
      return (
        employee.name.toLowerCase().includes(search) ||
        employee.department.toLowerCase().includes(search) ||
        employee.designation.toLowerCase().includes(search) ||
        employee.skills.some(skill => skill.toLowerCase().includes(search))
      );
    });
  }, [employees, searchTerm]);

  return {
    employees: filteredEmployees,
    totalEmployees: employees.length,
    hasResults: filteredEmployees.length > 0
  };
};

// Hook for bookmarked employees
export const useBookmarks = () => {
  const { employees, toggleBookmark } = useEmployeeStore();

  // Get only bookmarked employees
  const bookmarkedEmployees = useMemo(() => {
    return employees.filter(emp => emp.bookmarked === true);
  }, [employees]);

  return {
    bookmarkedEmployees,
    bookmarkCount: bookmarkedEmployees.length,
    toggleBookmark
  };
};