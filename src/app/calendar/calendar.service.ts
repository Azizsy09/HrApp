import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CalendarEvent, CalendarMonth, CalendarDay, CalendarWeek } from './calendar.model';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  constructor() { }

  getCalendarEvents(month: number, year: number): Observable<CalendarEvent[]> {
    // Simulation d'événements depuis les autres services
    const events: CalendarEvent[] = [
      // Projets
      {
        id: 'project-1',
        title: 'Refonte site web RH',
        description: 'Modernisation complète',
        startDate: '2024-12-01',
        endDate: '2025-03-31',
        type: 'project',
        color: '#1976d2',
        projectId: 1,
        projectName: 'Refonte site web RH'
      },
      // Congés
      {
        id: 'leave-1',
        title: 'Congés Alice Dupont',
        description: 'Vacances de Noël',
        startDate: '2024-12-20',
        endDate: '2024-12-27',
        type: 'leave',
        color: '#4caf50',
        employeeId: 1,
        employeeName: 'Alice Dupont'
      },
      // Pointages (simulés pour le mois en cours)
      {
        id: 'attendance-1',
        title: 'Pointage Alice',
        description: 'Journée complète',
        startDate: `${year}-${(month + 1).toString().padStart(2, '0')}-15`,
        endDate: `${year}-${(month + 1).toString().padStart(2, '0')}-15`,
        type: 'attendance',
        color: '#ff9800',
        employeeId: 1,
        employeeName: 'Alice Dupont'
      }
    ];

    return of(events);
  }

  generateCalendarMonth(year: number, month: number): Observable<CalendarMonth> {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay()); // Commencer par dimanche

    const weeks: CalendarWeek[] = [];
    let currentWeek: CalendarDay[] = [];
    let currentDate = new Date(startDate);

    // Générer 6 semaines pour couvrir le mois complet
    for (let week = 0; week < 6; week++) {
      currentWeek = [];

      for (let day = 0; day < 7; day++) {
        const isCurrentMonth = currentDate.getMonth() === month;
        const isToday = this.isToday(currentDate);
        const isWeekend = currentDate.getDay() === 0 || currentDate.getDay() === 6;

        const calendarDay: CalendarDay = {
          date: new Date(currentDate),
          dayNumber: currentDate.getDate(),
          isCurrentMonth,
          isToday,
          events: [], // Sera rempli plus tard
          isWeekend
        };

        currentWeek.push(calendarDay);
        currentDate.setDate(currentDate.getDate() + 1);
      }

      weeks.push({ days: currentWeek });
    }

    return of({
      month,
      year,
      weeks
    });
  }

  private isToday(date: Date): boolean {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  }

  getEventColor(type: string): string {
    const colors: {[key: string]: string} = {
      'project': '#1976d2',
      'leave': '#4caf50',
      'attendance': '#ff9800',
      'meeting': '#9c27b0'
    };
    return colors[type] || '#666';
  }

  getEventTypeLabel(type: string): string {
    const labels: {[key: string]: string} = {
      'project': 'Projet',
      'leave': 'Congé',
      'attendance': 'Pointage',
      'meeting': 'Réunion'
    };
    return labels[type] || type;
  }
}