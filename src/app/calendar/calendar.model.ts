export interface CalendarEvent {
    id: string;
    title: string;
    description?: string;
    startDate: string;
    endDate: string;
    type: CalendarEventType;
    color: string;
    employeeId?: number;
    employeeName?: string;
    projectId?: number;
    projectName?: string;
    status?: string;
  }
  
  export type CalendarEventType = 'project' | 'leave' | 'attendance' | 'meeting';
  
  export interface CalendarDay {
    date: Date;
    dayNumber: number;
    isCurrentMonth: boolean;
    isToday: boolean;
    events: CalendarEvent[];
    isWeekend: boolean;
  }
  
  export interface CalendarWeek {
    days: CalendarDay[];
  }
  
  export interface CalendarMonth {
    month: number;
    year: number;
    weeks: CalendarWeek[];
  }