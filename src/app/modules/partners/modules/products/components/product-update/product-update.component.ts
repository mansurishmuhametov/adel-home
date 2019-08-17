import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { takeUntil, switchMap, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { Subject } from 'rxjs/Subject';
import * as _ from 'lodash';
import { DomSanitizer } from '@angular/platform-browser';

import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product';
import { ProductType } from '../../models/product-type';
import { Image } from '../../models/image';

@Component({
    selector: 'app-product-update',
    templateUrl: './product-update.component.html',
    styleUrls: ['./product-update.component.scss']
})
export class ProductUpdateComponent implements OnInit, OnDestroy {
    private destroy$: Subject<boolean> = new Subject<boolean>();
    private id: string;
    private product: Product;
    private isChangesSaved: boolean = true;
    private image: string;
    private name: string;
    private priorities = [1, 2, 3, 4, 5];
    private priority = _.last(this.priorities);
    private productTypes: any[] = [
        {
            Id: '',
            Value: 'pajamas',
            Title: 'Пижама'
        },
        {
            Id: '',
            Value: 'beddingSet',
            Title: 'Постельный комплект'
        },
        {
            Id: '',
            Value: 'pillow',
            Title: 'Подушка'
        }
    ];

    get ProductTypes(): ProductType[] {
        return this.productTypes;
    }

    get Priority(): number {
        return this.priority;
    }

    get Priorities(): number[] {
        return this.priorities;
    }

    get Image(): string {
        return this.image;
    }

    get Name(): string {
        return this.name;
    }

    get UpdateForm(): FormGroup {
        return this.updateForm;
    }

    get Id(): string {
        return this.id;
    }

    private updateForm: FormGroup;

    constructor(
        private readonly route: ActivatedRoute,
        private readonly router: Router,
        private readonly productsService: ProductsService,
        private readonly zone: NgZone,
        private readonly sanitizer: DomSanitizer
    ) { }

    public ngOnInit(): void {
        this.refreshUpdateForm();

        this.route.paramMap
            .pipe(
                switchMap((params: ParamMap) => {
                    const id: string = params.get('id') || null;

                    return of(id);
                }),
                takeUntil(this.destroy$)
            )
            .subscribe(id => {
                this.id = id;
                this.refreshProduct();
            });
    }

    public refreshProduct(): void {
        if (!this.id) {
            return;
        }

        this.productsService.get(this.id)
            .pipe(
                takeUntil(this.destroy$)
            )
            .subscribe(product => {
                this.product = product;

                this.initImage(this.product.ImageId);
                this.mapToForm(this.product);
            });
    }

    public initImage(imageId: string): void {
        this.productsService.getImage(imageId)
            .pipe(
                takeUntil(this.destroy$)
            )
            .subscribe(image => {
                /**
                 * todo: тех долг
                 * каким-то образом из-за сервиса (скорее всего из-за firebase)
                 * теряется контекст
                 */
                this.zone.run(() => {
                    const trust = this.sanitizer.bypassSecurityTrustUrl(image);

                    this.updateForm.controls.image.setValue(trust);
                });
            });
    }

    public ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.complete();
    }

    public nameChanged(): void {
        this.isChangesSaved = false;
    }

    public priceChanged(): void {
        this.isChangesSaved = false;
    }

    public descriptionChanged(): void {
        this.isChangesSaved = false;
    }

    public onSubmit(): void {
        this.update();
    }

    public prioritySelected(priority: number): void {
        this.updateForm.controls.priority.setValue(priority);
    }

    public typeSelected(): void {
        //
    }

    public cancel(): void {
        this.router.navigate(['../../'], { relativeTo: this.route });
    }

    public message: string;

    public preview(files): void {
        if (files.length === 0)
            return;

        const mimeType = files[0].type;

        if (mimeType.match(/image\/*/) == null) {
            this.message = "Только картинки";

            return;
        }

        const reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = (_event) => {
            const image: string = reader.result.toString();
            this.updateForm.controls.image.setValue(image);
        }
    }

    private update(): void {
        const image: Image = new Image(null, this.updateForm.controls.image.value);

        this.productsService.updateImage(image)
            .pipe(
                mergeMap((imageId: string) => {
                    const product: Product = this.getProductFromForm(this.id, imageId);

                    return this.productsService.updateProduct(product);
                }),
                takeUntil(this.destroy$)
            )
            .subscribe(
                (productId: string) => {
                    if (this.id) {
                        this.refreshProduct();
                    } else {
                        this.refreshUpdateForm();
                    }
                },
                (error) => {
                    // ошибка
                    debugger;
                });
    }

    private mapToForm(product: Product): void {
        this.updateForm.controls.name.setValue(product.Name);
        this.updateForm.controls.price.setValue(product.Price);
        this.updateForm.controls.priority.setValue(product.Priority);
        this.updateForm.controls.description.setValue(product.Description);

        const type: ProductType = _.find(this.productTypes, { Value: product.Type })
        this.updateForm.controls.type.setValue(type);
    }

    private getProductFromForm(productId: string, imageId: string): Product {
        const controls = this.updateForm.controls;
        return new Product(
            productId,
            imageId,
            controls.name.value,
            controls.price.value,
            controls.priority.value,
            controls.type.value.Value,
            controls.description.value,
            controls.count.value
        );
    }

    private refreshUpdateForm() {
        this.updateForm = new FormGroup({
            name: new FormControl('', [
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(50)
            ]),
            price: new FormControl(null, [
                Validators.required,
                Validators.pattern("^[0-9]*$"),
                Validators.min(1),
                Validators.max(90000)
            ]),
            priority: new FormControl(_.last(this.priorities), [
                Validators.required
            ]),
            type: new FormControl(null, [
                Validators.required
            ]),
            image: new FormControl(null, [
                Validators.required
            ]),
            description: new FormControl('', []),
            count: new FormControl(0, [])
        });
    }
}
