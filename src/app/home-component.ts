import { Component } from '@angular/core';

@Component({ templateUrl: 'home-component.html' })
export class HomeComponent { 
    onClick() {
        window.location.href = 'http://localhost:8080/vivo112/angular/subsets';
    }
}