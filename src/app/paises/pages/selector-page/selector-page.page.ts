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
  // fronteras: string[] = []
  fronteras: PaisSmall[] = []

  // UI
  cargando: boolean = false

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
        // this.miFormulario.get('frontera')?.disable()
        this.cargando = true;
      }),
      switchMap(region => this.paisesService.getPaisesByRegion(region))
    ).subscribe(paises => {
      this.paises = paises
      this.cargando = false
      
    })

    this.miFormulario.get('pais')?.valueChanges
    .pipe(
      tap(() => {
        this.fronteras = []
        this.miFormulario.get('frontera')?.reset([])
        this.cargando = true;
      }),
      switchMap(codigo => this.paisesService.getPaisByCode(codigo)),
      switchMap(pais => this.paisesService.getPaisesPorCodigos(pais?.borders!))
    ).subscribe(
      paises => {
        this.fronteras = paises;
        // this.fronteras = pais?.borders || [];
        this.cargando = false}
    )

    
  }


  guardar() {
    console.log(this.miFormulario.value);

  }

}
