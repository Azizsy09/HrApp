import { Component, OnInit } from '@angular/core';
import { CalendarService } from '../../calendar/calendar.service';
import { CalendarMonth, CalendarEvent } from '../../calendar/calendar.model';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';


@Component({
  selector: 'app-planning-calendar',
  imports: [
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatCheckboxModule,
    MatCardModule,
    MatTooltipModule,
    CommonModule,
    FormsModule
  ],
  templateUrl: './planning-calendar.html',
  styleUrl: './planning-calendar.css',
})
export class PlanningCalendar implements OnInit {

  calendarMonth?: CalendarMonth;
  currentMonth: number;
  currentYear: number;
  weekdays = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
  isMobile = false;

  // Filtres
  showProjects = true;
  showLeaves = true;
  showAttendance = true;
  showMeetings = true;

  private allEvents: CalendarEvent[] = [];

  constructor(
    private calendarService: CalendarService,
    private breakpointObserver: BreakpointObserver
  ) {
    const today = new Date();
    this.currentMonth = today.getMonth();
    this.currentYear = today.getFullYear();

    this.breakpointObserver.observe([Breakpoints.Handset]).subscribe(result => {
      this.isMobile = result.matches;
    });
  }

  ngOnInit(): void {
    this.loadCalendar();
  }

  loadCalendar(): void {
    // Générer la grille du calendrier
    this.calendarService.generateCalendarMonth(this.currentYear, this.currentMonth)
      .subscribe(calendarMonth => {
        this.calendarMonth = calendarMonth;
        this.loadEvents();
      });
  }

  loadEvents(): void {
    this.calendarService.getCalendarEvents(this.currentMonth, this.currentYear)
      .subscribe(events => {
        this.allEvents = events;
        this.updateFilters();
      });
  }

  updateFilters(): void {
    if (!this.calendarMonth) return;

    // Filtrer les événements selon les préférences
    let filteredEvents = [...this.allEvents];

    if (!this.showProjects) {
      filteredEvents = filteredEvents.filter(e => e.type !== 'project');
    }
    if (!this.showLeaves) {
      filteredEvents = filteredEvents.filter(e => e.type !== 'leave');
    }
    if (!this.showAttendance) {
      filteredEvents = filteredEvents.filter(e => e.type !== 'attendance');
    }
    if (!this.showMeetings) {
      filteredEvents = filteredEvents.filter(e => e.type !== 'meeting');
    }

    // Réinitialiser les événements de chaque jour
    this.calendarMonth.weeks.forEach(week => {
      week.days.forEach(day => {
        day.events = [];
      });
    });

    // Assigner les événements filtrés aux jours correspondants
    filteredEvents.forEach(event => {
      const eventStart = new Date(event.startDate);
      const eventEnd = new Date(event.endDate);

      this.calendarMonth!.weeks.forEach(week => {
        week.days.forEach(day => {
          const dayDate = new Date(day.date);
          // Vérifier si l'événement couvre ce jour
          if (dayDate >= eventStart && dayDate <= eventEnd) {
            day.events.push(event);
          }
        });
      });
    });
  }

  previousMonth(): void {
    if (this.currentMonth === 0) {
      this.currentMonth = 11;
      this.currentYear--;
    } else {
      this.currentMonth--;
    }
    this.loadCalendar();
  }

  nextMonth(): void {
    if (this.currentMonth === 11) {
      this.currentMonth = 0;
      this.currentYear++;
    } else {
      this.currentMonth++;
    }
    this.loadCalendar();
  }

  goToToday(): void {
    const today = new Date();
    this.currentMonth = today.getMonth();
    this.currentYear = today.getFullYear();
    this.loadCalendar();
  }

  getMonthName(month: number): string {
    const monthNames = [
      'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
      'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
    ];
    return monthNames[month];
  }

  openEventDetails(event: CalendarEvent): void {
    const typeLabel = this.calendarService.getEventTypeLabel(event.type);
    alert(`${typeLabel}: ${event.title}\nDescription: ${event.description || 'N/A'}\nDu: ${event.startDate}\nAu: ${event.endDate}`);
  }

  getEventCount(type: string): number {
    return this.allEvents.filter(e => e.type === type).length;
  }

  getTotalEvents(): number {
    return this.allEvents.length;
  }

  getEventTypeLabel(type: string): string {
    return this.calendarService.getEventTypeLabel(type);
  }
}