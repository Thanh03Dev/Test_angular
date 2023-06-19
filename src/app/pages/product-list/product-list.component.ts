import { Component } from '@angular/core';
import { IProduct } from 'src/app/interfaces/Product';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {
  products: IProduct[] = [];

  constructor(private productService: ProductService, private router: Router) {

    this.productService.getAllProducts().subscribe(data => {
      this.products = data;
    }, error => {
      console.log(error.message);
    })
  }

  removeItem(id: any) {
    this.productService.deleteProduct(id).subscribe(() => {
      alert("Xoa thanh cong")
      this.router.navigate([""])
    })
  }
}
