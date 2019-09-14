import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { takeUntil, switchMap, mergeMap, map } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { Subject } from 'rxjs/Subject';
import * as _ from 'lodash';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { NotifierService } from 'angular-notifier';

import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product';
import { Image } from '../../models/image';
import { Slide } from '../../models/slide';
import { Category } from '../../models/category';

@Component({
    selector: 'app-product-update',
    templateUrl: './product-update.component.html',
    styleUrls: ['./product-update.component.scss']
})
export class ProductUpdateComponent implements OnInit, OnDestroy {
    private destroy$: Subject<boolean> = new Subject<boolean>();
    private id: string;
    private imageError: string;
    private product: Product;
    private isProcesing = false;
    private name: string;
    private regExNumber = '^[0-9]*$';
    private priorities = [1, 2, 3, 4, 5];
    private priority = _.last(this.priorities);
    private currentSlide: Slide;
    private categories: any[] = [
        {
            Id: '',
            Value: 'clothes',
            Title: 'Трикотаж для дома'
        },
        {
            Id: '',
            Value: 'beddingSet',
            Title: 'Постельный комплект'
        },
        {
            Id: '',
            Value: 'towel',
            Title: 'Полотенца'
        },
        {
            Id: '',
            Value: 'accessory',
            Title: 'Аксессуары'
        }
    ];

    get ImageError(): string {
        return this.imageError;
    }

    get Categories(): Category[] {
        return this.categories;
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

    public mapImagesToForm(imageIds: string[]): void {
        this.updateForm.controls.slides.setValue([]);

        this.productsService.getImages(imageIds)
            .pipe(
                map((images) => {
                    return images;
                }),
                takeUntil(this.destroy$)
            )
            .subscribe((images: Image[]) => {
                _.forEach(images, img => this.addSlide(img));
            },
            (error) => {
                this.notifier.notify('error', 'Не удалось загрузить изображение');
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
        const images: Image[] = _.map(this.updateForm.controls.slides.value, item => item.Value);
        const product: Product = this.getProductFromForm(this.id, []);

        this.isProcesing = true;

        this.productsService.update(product, images)
            .pipe(
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

        const category: Category = _.find(this.categories, { Value: product.Category });
        this.updateForm.controls.category.setValue(category);
        this.mapImagesToForm(this.product.Images);

        // 01
        debugger;
    }

    private getProductFromForm(productId: string, imageIds: string[]): Product {
        const controls = this.updateForm.controls;

        return new Product(
            productId,
            controls.name.value,
            controls.price.value,
            controls.article.value,
            controls.priority.value,
            controls.category.value.Value,
            controls.description.value,
            controls.count.value,
            controls.consist.value,
            imageIds
        );
    }

    private refreshUpdateForm() {
        // 01
        debugger;

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
            category: new FormControl(null, [
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
                Validators.minLength(1),
                Validators.maxLength(3)
            ]),
        });

        // 02
        debugger;

        this.updateForm.controls.slides.markAsTouched()
    }
}
