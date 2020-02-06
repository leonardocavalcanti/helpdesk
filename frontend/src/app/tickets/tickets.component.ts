import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class Tickets implements OnInit {
  tickets: any[];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get('http://localhost:80/api/tickets').subscribe((d: any) => {
      this.tickets = d.content;
    })
  }
}
