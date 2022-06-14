import {Component, OnInit} from '@angular/core';
import {ProductService} from '@services/product.service';
import {CreateProductDTO, ProductModel, UpdateProductDTO} from '@models/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  products: ProductModel[] = [];

  constructor(private productService: ProductService) {

  }

  ngOnInit(): void {
    this.getProducts();
    this.getProduct();
    this.createProduct();
    this.updateProduct();
    this.deleteProduct();
  }

  getProducts() {
    this.productService.index().subscribe(products => {
      this.products = products;
    });
  }

  getProduct() {
    this.productService.show(1).subscribe(response => {
      console.log(response);
    });
  }

  createProduct() {
    const data: CreateProductDTO = {
      "name": "Juan",
      "lastname": "Perez",
      "birthdate": "1990-12-04",
      "married": false,
      "age": 30
    };
    this.productService.store(data).subscribe(response => {
      console.log(response);
    });
    ;
  }

  updateProduct() {
    const data: UpdateProductDTO = {
      "name": "Juan",
      "lastname": "Perez",
      "birthdate": "1990-12-04",
      "married": false,
      "age": 30
    };
    this.productService.update(1, data).subscribe(response => {
      console.log(response);
    });
  }

  deleteProduct() {
    this.productService.destroy(1).subscribe(response => {
      console.log(response);
    });
    ;
  }
}
