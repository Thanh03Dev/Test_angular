import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { IProduct } from './../../interfaces/Product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent {

  productForm = this.formBuilder.group({
    name: ["", [Validators.required, Validators.minLength(6)]],
    price: [0],
    img: [""]
  })

  constructor(private formBuilder: FormBuilder, private productService: ProductService, private router: Router) {

  }

  onHandleSubmit() {
    if (this.productForm.valid) {
      const product: IProduct = {
        name: this.productForm.value.name || "",
        price: this.productForm.value.price || 0,
        img: this.productForm.value.img || "",
      }
      this.productService.addProduct(product).subscribe(product => {
        console.log("Them san pham thanh cong", product)
        this.router.navigate([""])
      })
    }
  }
}
