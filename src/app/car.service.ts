import { Injectable } from '@angular/core';
import { HttpClient , HttpErrorResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Car } from './car';
import { inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../environments/environment';
//import { environment } from 'src/environments/environment';


//import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class CarService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient){}

  public getCars(): Observable<Car[]> {
    return this.http.get<Car[]>(`${this.apiServerUrl}/api/v1/car/all`);
  }

  public addCar(car: Car): Observable<Car> {
    return this.http.post<Car>(`${this.apiServerUrl}/api/v1/car/add`, car);
  }
  
  public async updateCar(car: Car): Promise<Car> {
    try {
      return await firstValueFrom(this.http.put<Car>(`${this.apiServerUrl}/api/v1/car/update`, car));
    } catch (error: any) {
      if (error instanceof HttpErrorResponse) {
        console.error('Error updating car:', error);
        throw error;
      } else {
        console.error('Unexpected error updating car:', error);
        throw error;
      }
    }
  }
  // public updateCar(car: Car): Observable<Car> {
  //   return this.http.put<Car>(`${this.apiServerUrl}/api/v1/car/update`, car);
  // }

  public deleteCar(carid: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/api/v1/car/delete/${carid}`);
  }
}