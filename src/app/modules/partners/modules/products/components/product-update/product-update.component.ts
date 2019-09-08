import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { takeUntil, switchMap, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { Subject } from 'rxjs/Subject';
import * as _ from 'lodash';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { NotifierService } from 'angular-notifier';

import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product';
import { ProductType } from '../../models/product-type';
import { Image } from '../../models/image';
import { Slide } from '../../models/slide';

@Component({
    selector: 'app-product-update',
    templateUrl: './product-update.component.html',
    styleUrls: ['./product-update.component.scss']
})
export class ProductUpdateComponent implements OnInit, OnDestroy {
    private destroy$: Subject<boolean> = new Subject<boolean>();
    private id: string;
    private imageId: string;
    private imageError: string;
    private product: Product;
    private isProcesing = false;
    private name: string;
    private regExNumber = '^[0-9]*$';
    private priorities = [1, 2, 3, 4, 5];
    private priority = _.last(this.priorities);
    private currentSlide: Slide;
    private productTypes: any[] = [
        {
            Id: '',
            Value: 'clothes',
            Title: 'Одежда'
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

    get ImageError(): string {
        return this.imageError;
    }

    get ProductTypes(): ProductType[] {
        return this.productTypes;
    }

    get Priority(): number {
        return this.priority;
    }

    get Priorities(): number[] {
        return this.priorities;
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

    get IsProcesing(): boolean {
        return this.isProcesing;
    }

    get Slides(): Slide[] {
        return this.updateForm.controls.slides.value;
    }

    get CurrentSlide(): Slide {
        return this.currentSlide;
    }

    private updateForm: FormGroup;

    constructor(
        private readonly route: ActivatedRoute,
        private readonly router: Router,
        private readonly productsService: ProductsService,
        private readonly zone: NgZone,
        private readonly sanitizer: DomSanitizer,
        private readonly notifier: NotifierService
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
                this.mapToForm(this.product);
            });
    }

    public mapImageToForm(imageId: string): void {
        this.updateForm.controls.slides.setValue([]);
        this.imageId = imageId;

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
                    this.addSlide(image);
                });
            },
            (error) => {
                this.zone.run(() => {
                    this.notifier.notify('error', 'Не удалось загрузить изображение');
                });
            });
    }

    public ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.complete();
    }

    public onSubmit(): void {
        this.update();
    }

    public prioritySelected(priority: number): void {
        this.updateForm.controls.priority.setValue(priority);
    }

    public cancel(): void {
        this.router.navigate(['../../'], { relativeTo: this.route });
    }

    public preview(files): void {
        if (files.length === 0) {
            return;
        }

        const mimeType = files[0].type;

        if (mimeType.match(/image\/*/) == null) {
            this.imageError = 'Только картинки';

            return;
        }

        const reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = (_event) => {
            const content: string = reader.result.toString();
            const safeContent: SafeUrl = this.sanitizer.bypassSecurityTrustUrl(content);
            const img = new Image(null, content);

            this.addSlide(img);
        };
    }

    public slideSelect(slide: Slide) {
        this.currentSlide = slide;
    }

    public removeSlide(slide) {
        const allSlides: Slide[] = this.updateForm.controls.slides.value;

        _.remove(allSlides, slide);

        this.updateForm.controls.slides.setValue(_.map(allSlides, item => item));
    }

    private addSlide(image: Image): void {
        const slide = new Slide(image.Content, image);
        const allSlides: Slide[] = this.updateForm.controls.slides.value;

        allSlides.push(slide);

        this.updateForm.controls.slides.setValue(_.map(allSlides, item => item));
    }

    private update(): void {
        const imageContent: string = _.head(this.updateForm.controls.slides.value)['Content'];
        const image: Image = new Image(this.imageId, imageContent);

        this.isProcesing = true;
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
                        this.notifier.notify('success', 'Данные сохранены');
                        this.refreshProduct();
                    } else {
                        this.notifier.notify('success', 'Добавлен новый товар');
                        this.refreshUpdateForm();
                    }
                },
                (error) => {
                    this.notifier.notify('success', 'Не удалось сохранить изменения');
                },
                () => {
                    this.isProcesing = false;
                });
    }

    private mapToForm(product: Product): void {
        this.updateForm.controls.name.setValue(product.Name);
        this.updateForm.controls.price.setValue(product.Price);
        this.updateForm.controls.article.setValue(product.Article);
        this.updateForm.controls.priority.setValue(product.Priority);
        this.updateForm.controls.description.setValue(product.Description);
        this.updateForm.controls.consist.setValue(product.Consist);

        const type: ProductType = _.find(this.productTypes, { Value: product.Type });
        this.updateForm.controls.type.setValue(type);
        this.mapImageToForm(this.product.ImageId);
    }

    private getProductFromForm(productId: string, imageId: string): Product {
        const controls = this.updateForm.controls;

        return new Product(
            productId,
            imageId,
            controls.name.value,
            controls.price.value,
            controls.article.value,
            controls.priority.value,
            controls.type.value.Value,
            controls.description.value,
            controls.count.value,
            controls.consist.value
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
                Validators.pattern(this.regExNumber),
                Validators.min(1),
                Validators.max(90000)
            ]),
            article: new FormControl(null, [
                Validators.required,
                Validators.pattern(this.regExNumber),
                Validators.minLength(4),
                Validators.maxLength(20)
            ]),
            priority: new FormControl(_.last(this.priorities), [
                Validators.required
            ]),
            type: new FormControl(null, [
                Validators.required
            ]),
            consist: new FormControl('', [
                Validators.minLength(3),
                Validators.maxLength(50)
            ]),
            description: new FormControl('', []),
            count: new FormControl(0, []),
            slides: new FormControl([],
            [
                Validators.required,
                Validators.maxLength(1)
            ]),
        });

        this.updateForm.controls.slides.markAsTouched()
    }
}
