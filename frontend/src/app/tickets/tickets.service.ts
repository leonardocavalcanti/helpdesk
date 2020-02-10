import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TicketsService {
    apiUrl: string;

    constructor(private httpClient: HttpClient) {
        this.apiUrl = `${environment.apiUrl}/tickets`;
    }

    list(sort: string, order: string, page: number): Observable<any> {
        return this.httpClient.get(`${this.apiUrl}?sort=${sort}&order=${order}&page=${page + 1}`);
    }
}