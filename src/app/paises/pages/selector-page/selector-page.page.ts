import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaisesServiceService } from '../../services/paises-service.service';
import { PaisSmall } from '../../interfaces/paises.interface';

import {switchMap, tap} from 'rxjs/operators'

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.page.html',
  styleUrls: ['./selector-page.page.css']
})
export class SelectorPagePage implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    region: ['', Validators.required],
    pais: ['', Validators.required],
    frontera: ['', Validators.required]
  })

  // Llenando regiones
  regiones: string[] = [];
  paises: PaisSmall[] = [];
  fronteras: string[] = []

  constructor(private fb: FormBuilder,
    private paisesService: PaisesServiceService) { }

  ngOnInit(): void {
    this.regiones = this.paisesService.regiones

    // Cuando cambie la region
    // this.miFormulario.get('region')?.valueChanges.subscribe(region => {
      
    //   this.paisesService.getPaisesByRegion(region).subscribe(paises => {
    //     console.log(paises);
    //     this.paises = paises
    //    })
    // })

    this.miFormulario.get('region')?.valueChanges.pipe(
      // disparar efecto scundario
      tap( (_) => {
        this.miFormulario.get('pais')?.reset('')
      }),
      switchMap(region => this.paisesService.getPaisesByRegion(region))
    ).subscribe(paises => {
      this.paises = paises
      
    })

    this.miFormulario.get('pais')?.valueChanges
    .pipe(
      tap(() => {
        this.fronteras = []
        this.miFormulario.get('frontera')?.reset([])
      }),
      switchMap(codigo => this.paisesService.getPaisByCode(codigo))
    ).subscribe(
      pais => this.fronteras = pais?.borders || []
    )

    
  }


  guardar() {
    console.log(this.miFormulario.value);

  }

}
