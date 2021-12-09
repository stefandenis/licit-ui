import {
  AfterContentChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Renderer2,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Subject } from 'rxjs';
interface ItemBigCards {
  itemId: string;
  isAddedToWatchList: boolean;
  title: string;
  endDate: string;
  price: string;
  imageUrl: string;
}

const ITEMS_BIG_CARD: ItemBigCards[] = [
  {
    itemId: 'uuid',
    isAddedToWatchList: true,
    title: 'Tricou Gucci',
    endDate: '2021-10-22T00:00:00',
    price: '20 lei',
    imageUrl: "'../../../../assets/tricou.jpg'",
  },
  {
    itemId: 'uuid',
    isAddedToWatchList: false,
    title: 'Tricou Gucci',
    endDate: '2021-10-22T00:00:00',
    price: '20 lei',
    imageUrl: "'../../../../assets/tricou.jpg'",
  },
  {
    itemId: 'uuid',
    isAddedToWatchList: false,
    title: 'Tricou Gucci',
    endDate: '2021-10-22T00:00:00',
    price: '20 lei',
    imageUrl: "'../../../../assets/tricou.jpg'",
  },
  {
    itemId: 'uuid',
    isAddedToWatchList: false,
    title: 'Tricou Gucci',
    endDate: '2021-10-22T00:00:00',
    price: '20 lei',
    imageUrl: "'../../../../assets/tricou.jpg'",
  },
  {
    itemId: 'uuid',
    isAddedToWatchList: true,
    title: 'Tricou Gucci',
    endDate: '2021-10-22T00:00:00',
    price: '20 lei',
    imageUrl: "'../../../../assets/tricou.jpg'",
  },
  {
    itemId: 'uuid',
    isAddedToWatchList: true,
    title: 'Tricou Gucci',
    endDate: '2021-10-22T00:00:00',
    price: '20 lei',
    imageUrl: "'../../../../assets/tricou.jpg'",
  },
  {
    itemId: 'uuid',
    isAddedToWatchList: true,
    title: 'Tricou Gucci',
    endDate: '2021-10-22T00:00:00',
    price: '20 lei',
    imageUrl: "'../../../../assets/tricou.jpg'",
  },
  {
    itemId: 'uuid',
    isAddedToWatchList: true,
    title: 'Tricou Gucci',
    endDate: '2021-10-22T00:00:00',
    price: '20 lei',
    imageUrl: "'../../../../assets/tricou.jpg'",
  },
  {
    itemId: 'uuid',
    isAddedToWatchList: true,
    title: 'Tricou Gucci',
    endDate: '2021-10-22T00:00:00',
    price: '20 lei',
    imageUrl: "'../../../../assets/tricou.jpg'",
  },
  {
    itemId: 'uuid',
    isAddedToWatchList: true,
    title: 'Tricou Gucci',
    endDate: '2021-10-22T00:00:00',
    price: '20 lei',
    imageUrl: "'../../../../assets/tricou.jpg'",
  },
];

const numberOfNonCardElements = 2;

@Component({
  selector: 'app-cards-container',
  templateUrl: './cards-container.component.html',
  styleUrls: ['./cards-container.component.scss'],
})
export class CardsContainerComponent
  implements OnInit, AfterViewInit, OnChanges
{
  itemBigCards: ItemBigCards[];
  screenWidth: number;
  @ViewChild('cardsContainer') cardsContainer: ElementRef;
  @ViewChild('cardsContainerWrapper') containerWrapper: ElementRef;
  @ViewChild('dotsContainer') dotsContainer: ElementRef;
  areItemsLoaded: boolean = false;
  activePage = 1;
  totalActivePages: number;
  arrangeCards = new Subject();

  @HostListener('window:resize', ['$event'])
  onResize() {
    // this.screenWidth = window.innerWidth;
    var containerWidth = this.cardsContainer.nativeElement.offsetWidth;
    var cardWidth = this.cardsContainer.nativeElement.children[0].offsetWidth;
    var numberOfCards = this.cardsContainer.nativeElement.children.length - 2;
    var itemsPerSlide = Math.floor(containerWidth / cardWidth);
    var spaceLeft = containerWidth - itemsPerSlide * cardWidth;
    this.containerWrapper.nativeElement.style.paddingLeft =
      spaceLeft / 2 + 'px';
    this.containerWrapper.nativeElement.style.paddingRight =
      spaceLeft / 2 + 'px';
    console.log('card width: ', cardWidth);
    console.log('itemsPerSlide: ', itemsPerSlide);
    console.log('container width:', containerWidth);
    console.log('space left: ', spaceLeft);
  }

  constructor(private cd: ChangeDetectorRef, private renderer: Renderer2) {
    console.log('arrange cards');
    this.arrangeCards.subscribe(() => {
      console.log('arrange cards');
      var containerWidth = this.cardsContainer.nativeElement.offsetWidth;
      var cardWidth = this.cardsContainer.nativeElement.children[0].offsetWidth;
      var numberOfCards = this.itemBigCards.length;
      var itemsPerSlide = Math.floor(containerWidth / cardWidth);
      var spaceLeft = containerWidth - itemsPerSlide * cardWidth;
      this.totalActivePages = Math.ceil(numberOfCards / itemsPerSlide);
      var dot = this.renderer.createElement('div');
      this.renderer.addClass(dot, 'nav-dots__dot');
      this.renderer.addClass(dot, 'nav-dots__dot--inactive');
      for (var i = 0; i < this.totalActivePages; i++) {
        var dot = this.renderer.createElement('div');
        this.renderer.addClass(dot, 'nav-dots__dot');
        if (i == 0) this.renderer.addClass(dot, 'nav-dots__dot--active');
        else this.renderer.addClass(dot, 'nav-dots__dot--inactive');
        this.renderer.appendChild(this.dotsContainer.nativeElement, dot);
      }
      for (var i = 0; i < numberOfCards; i++) {
        this.cardsContainer.nativeElement.children[i].style.paddingLeft =
          spaceLeft / itemsPerSlide / 2 + 'px';
        this.cardsContainer.nativeElement.children[i].style.paddingRight =
          spaceLeft / itemsPerSlide / 2 + 'px';
      }
      console.log('card width: ', cardWidth);
      console.log('itemsPerSlide: ', itemsPerSlide);
      console.log('container width:', containerWidth);
      console.log('space left: ', spaceLeft);
    });
    setTimeout(() => {
      this.itemBigCards = ITEMS_BIG_CARD;
      cd.detectChanges();
      this.arrangeCards.next();
    }, 500); // the http call
    this.screenWidth = window.innerWidth;
  }
  ngOnInit(): void {}

  ngAfterViewInit() {
    console.log('after view init');
    console.log(this.cardsContainer);
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('changes appeared: ', changes);
  }
  getDate() {
    return new Date('2021-10-25T00:00:00').toString();
  }

  slideToRight() {
    console.log(this.activePage);
    if (this.activePage != this.totalActivePages) {
      console.log(this.cardsContainer.nativeElement);
      this.cardsContainer.nativeElement.scroll({
        left:
          this.cardsContainer.nativeElement.scrollLeft +
          this.cardsContainer.nativeElement.offsetWidth,
        behavior: 'smooth',
      });
      this.renderer.removeClass(
        this.dotsContainer.nativeElement.children[this.activePage - 1],
        'nav-dots__dot--active'
      );
      this.renderer.addClass(
        this.dotsContainer.nativeElement.children[this.activePage - 1],
        'nav-dots__dot--inactive'
      );
      this.activePage++;
      this.renderer.addClass(
        this.dotsContainer.nativeElement.children[this.activePage - 1],
        'nav-dots__dot--active'
      );
    }
  }

  slideToLeft() {
    console.log(this.activePage);
    if (this.activePage != 1) {
      this.cardsContainer.nativeElement.scroll({
        left:
          this.cardsContainer.nativeElement.scrollLeft -
          this.cardsContainer.nativeElement.offsetWidth,
        behavior: 'smooth',
      });
      this.renderer.removeClass(
        this.dotsContainer.nativeElement.children[this.activePage - 1],
        'nav-dots__dot--active'
      );
      this.renderer.addClass(
        this.dotsContainer.nativeElement.children[this.activePage - 1],
        'nav-dots__dot--inactive'
      );
      this.activePage--;
      this.renderer.addClass(
        this.dotsContainer.nativeElement.children[this.activePage - 1],
        'nav-dots__dot--active'
      );
    }
  }
}
