import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';

// Employee type definition
interface Employee {
  id: string;
  name: string;
  email: string;
  department: string;
  designation: string;
  profileImage: string;
  performanceRating: number;
  skills: string[];
  bookmarked: boolean;
  isActive: boolean;
}

interface EmployeeStore {
  employees: Employee[];
  isLoading: boolean;
  hasLoaded: boolean; // Track if we've loaded data at least once
  
  // Actions
  fetchEmployees: () => Promise<void>;
  toggleBookmark: (id: string) => void;
}

export const useEmployeeStore = create<EmployeeStore>()(
  persist(
    (set, get) => ({
      employees: [],
      isLoading: false,
      hasLoaded: false,
      
      // Fetch employees from API
      fetchEmployees: async () => {
        // Don't fetch if already loading
        if (get().isLoading) return;
        
        try {
          set({ isLoading: true });
          
          const response = await axios.get('https://mockapi-hrdashboard.onrender.com/api/employees');
          const newEmployees = response.data.data;
          
          // Get current employees to preserve bookmarks
          const currentEmployees = get().employees;
          
          // Merge new data with existing bookmarks
          const updatedEmployees = newEmployees.map((newEmp: any) => {
            // Find existing employee to preserve bookmark status
            const existingEmp = currentEmployees.find(emp => emp.id === newEmp.id);
            
            return {
              ...newEmp,
              bookmarked: existingEmp ? existingEmp.bookmarked : false
            };
          });
          
          set({ 
            employees: updatedEmployees, 
            isLoading: false,
            hasLoaded: true 
          });
          
        } catch (error) {
          console.error('Failed to fetch employees:', error);
          set({ isLoading: false });
        }
      },
      
      // Toggle bookmark for an employee
      toggleBookmark: (id: string) => {
        set((state) => ({
          employees: state.employees.map((emp) =>
            emp.id === id 
              ? { ...emp, bookmarked: !emp.bookmarked }
              : emp
          )
        }));
      }
    }),
    {
      name: 'employee-store', // Storage key name in localStorage
      partialize: (state) => ({ 
        employees: state.employees,
        hasLoaded: state.hasLoaded 
      })
    }
  )
);