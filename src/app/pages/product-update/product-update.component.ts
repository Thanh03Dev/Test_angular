import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/interfaces/Product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.scss']
})
export class ProductUpdateComponent {
  product!: IProduct;

  productForm = this.formBuilder.group({
    name: ["", [Validators.required, Validators.minLength(6)]],
    price: [0],
    img: [""]
  })

  constructor(private formBuilder: FormBuilder, private productService: ProductService, private router: Router, private route: ActivatedRoute) {
    this.route.paramMap.subscribe(param => {
      const id = Number(param.get('id'));
      this.productService.getProductById(id).subscribe(product => {
        this.product = product;

        this.productForm.patchValue({
          name: product.name,
          price: product.price,
          img: product.img
        })
      }, error => console.log(error.message));
    })
  }

  onHandleSubmit() {
    if (this.productForm.valid) {
      const newproduct: IProduct = {
        id: this.product.id,
        name: this.productForm.value.name || "",
        price: this.productForm.value.price || 0,
        img: this.productForm.value.img || "",
      }
      this.productService.updateProduct(newproduct).subscribe(product => {
        console.log("Cap nhat san pham thanh cong", product)
        this.router.navigate(["/"])
      })
    }
  }
}
