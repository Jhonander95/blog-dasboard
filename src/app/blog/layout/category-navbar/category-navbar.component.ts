import { Component, HostListener, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-category-navbar',
  templateUrl: './category-navbar.component.html',
  styleUrls: ['./category-navbar.component.scss']
})
export class CategoryNavbarComponent implements OnInit {

  categories: any= [];

  constructor( private categoriesService: CategoriesService ){}

  esPantallaPequena = false;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.esPantallaPequena = window.innerWidth < 768; // Define el ancho máximo para considerar como pantalla pequeña (en este ejemplo, 768px)
  }

  ngOnInit(): void {
    this.categoriesService.LoadData().subscribe( cat => {
      this.categories = cat;
      console.log(this.categories);
    });

    this.esPantallaPequena = window.innerWidth < 768; // Verifica el tamaño de la pantalla al cargar la página

    
  }

}
