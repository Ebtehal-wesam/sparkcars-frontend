import { RouterOutlet } from '@angular/router';
import { Car} from './car'; 
import {CarService} from './car.service'; 
import { HttpErrorResponse } from '@angular/common/http';
import { Component, ViewChild ,OnInit ,ElementRef} from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule, NgIf ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {
 
@ViewChild('updateCarModal') updateCarModal?: ElementRef;
@ViewChild('deleteCarModal') deleteCarModal?: ElementRef;
@ViewChild('addCarModal') addCarModal?: ElementRef;



  // Other component properties and methods

  openModalTry1() {
    // Access the modal element and show it
    this.updateCarModal?.nativeElement.classList.add('show');
    this.updateCarModal!.nativeElement.style.display = 'block';
  }

  closeModalTry1() {
    // Access the modal element and hide it
    this.updateCarModal?.nativeElement.classList.remove('show');
    this.updateCarModal!.nativeElement.style.display = 'none';
  }
  openModalTry2() {
    // Access the modal element and show it
    this.deleteCarModal?.nativeElement.classList.add('show');
    this.deleteCarModal!.nativeElement.style.display = 'block';
  }

  closeModalTry2() {
    // Access the modal element and hide it
    this.deleteCarModal?.nativeElement.classList.remove('show');
    this.deleteCarModal!.nativeElement.style.display = 'none';
  }
    openModalTry3() {
    // Access the modal element and show it
    this.addCarModal?.nativeElement.classList.add('show');
    this.addCarModal!.nativeElement.style.display = 'block';
  }

  closeModalTry3() {
    // Access the modal element and hide it
    this.addCarModal?.nativeElement.classList.remove('show');
    this.addCarModal!.nativeElement.style.display = 'none';
  }
    public cars?: Car[]; 
  public editCar?: Car;
  public deleteCar?: Car;
  ngOnInit() {
    this.getCars();
  }
  constructor(private carser: CarService, private httpClient: HttpClient){}

  public getCars(): void {
    this.carser.getCars().subscribe(
      (response: Car[]) => {
        this.cars = response;
        console.log(this.cars);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddCar(addForm: NgForm): void {
    document.getElementById('add-car-form')?.click();
    this.carser.addCar(addForm.value).subscribe(
      (response: Car) => {
        console.log(response);
        this.getCars();
        addForm.reset();
        this.closeModalTry3();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }
  public async onUpdateCar(car: Car): Promise<void> {
    try {
      const response: Car = await this.carser.updateCar(car);
      console.log(response);
      await this.getCars();
      this.closeModalTry1();
    } catch (error: any) {
      if (error instanceof HttpErrorResponse) {
        alert(error.message);
      } else {
        console.error('Error updating car:', error);
      }
    }
  }

  // public onUpdateCar(car: Car): void {
  //   this.carser.updateCar(car, car.id).subscribe(
  //     (response: Car) => {
  //       console.log(response);
  //       this.getCars();
  //     },
  //     (error: HttpErrorResponse) => {
  //       alert(error.message);
  //     }
  //   );
  // }


  public onDeleteCar(carId: number| undefined): void {
    if (carId != undefined){
      this.carser.deleteCar(carId).subscribe(
        (response: void) => {
          console.log(response);
          this.getCars();
                this.closeModalTry2();

        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    } 
  
  }

  public searchCar(key: string): void {
    console.log(key);
    const results: Car[] = [];
    for (const car of this.cars!) {
      if (car.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || car.company.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || car.country.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || car.color.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(car);
      }
    }
    this.cars = results;
    if (results.length === 0 || !key) {
      this.getCars();
    }
  }


  public onOpenModal(): void {
    // alert('add a car');
    // const container = document.getElementById('main-container');
    // const button = document.createElement('button');
    // button.type = 'button';
    // button.style.display = 'none';
    // button.setAttribute('data-toggle', 'modal');
    // button.setAttribute('data-target', '#addCarModal');
    // container?.appendChild(button);
    // button.click();
            this.openModalTry3();

  }

  public onOpenModal2(  car:Car, mode: string): void {
  //  const container = document.getElementById('main-container');
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    
      if (mode === 'edit') {
       this.editCar = car;
        button.setAttribute('data-target', 'updateCarModal');
        this.openModalTry1();

      }
      if (mode === 'delete') {
        this.deleteCar = car;
        button.setAttribute('data-target', '#deleteCarModal');
        this.openModalTry2();

      }
       container?.appendChild(button)
       
       button.click(); 
        
  // openMod() {
  //   this.modalContainer.nativeElement.style.display = 'block';
  // }
  }



}
