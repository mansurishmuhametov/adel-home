import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { takeUntil, switchMap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { Subject } from 'rxjs/Subject';
import * as _ from 'lodash';

import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product';
import { ProductType } from '../../models/product-type';

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

    get ProductTypes(): any[] {
        return this.productTypes;
    }

    get Product(): Product {
        return this.product;
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

    private updateForm: FormGroup = new FormGroup({
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
        ])
    });

    constructor(
        private readonly route: ActivatedRoute,
        private readonly router: Router,
        private readonly productsService: ProductsService,
        private readonly zone: NgZone
    ) { }

    public ngOnInit(): void {
        this.clear();

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
                this.refresh();
            });
    }

    public refresh(): void {
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
                    this.image = image;
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
        //
    }

    private update(): void {
        const t: any = this.updateForm;

        // 01
        debugger;
    }

    private mapToForm(product: Product): void {
        this.updateForm.controls.name.setValue(product.Name);
        this.updateForm.controls.price.setValue(product.Price);
        this.updateForm.controls.priority.setValue(product.Priority);

        const type: any = _.find(this.productTypes, { Value: product.Type })
        this.updateForm.controls.type.setValue(type);
    }

    private clear(): void {
        this.product = new Product(null, '', '', 0, 0, null, '', 0);
    }


    public imagePath;
    imgURL: any;
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
        this.imagePath = files;
        reader.readAsDataURL(files[0]);
        reader.onload = (_event) => {
            this.imgURL = reader.result;
        }
    }
}
