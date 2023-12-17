import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

type DataForMutation<T> = T extends { id: any } ? T : never;

@Injectable({
  providedIn: 'root'
})
export class GenericHttpAdapter<T> {
  constructor(private http: HttpClient) { }

  getAll<G>(endpoint: string, queryParams?: G): Promise<T[]> {
    let url = endpoint;
    if (queryParams) {
      const params = new HttpParams({ fromObject: queryParams });
      url += '?' + params.toString();
    }
    return firstValueFrom(this.http.get<T[]>(url));
  }

  getOne(endpoint: string, id: any): Promise<T> {
    return firstValueFrom(this.http.get<T>(`${endpoint}/${id}`));
  }

  create(endpoint: string, data: Omit<T, 'id'>): Promise<T> {
    return firstValueFrom(this.http.post<T>(endpoint, data));
  }

  update(endpoint: string, data: DataForMutation<T>): Promise<T> {
    return firstValueFrom(this.http.put<T>(`${endpoint}/${data.id}`, data));
  }

  delete(endpoint: string, id: any): Promise<void> {
    return firstValueFrom(this.http.delete<void>(`${endpoint}/${id}`));
  }
}
