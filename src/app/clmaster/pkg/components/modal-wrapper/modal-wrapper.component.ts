// modal-wrapper.component.ts
import {
  Component,
  Input,
  OnInit,
  Type,
  ViewChild,
  ViewContainerRef,
  ComponentFactoryResolver,
  Injector,
} from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-modal-wrapper",
  styleUrls: ["./modal-wrapper.component.css"],
  templateUrl: "./modal-wrapper.component.html",
})
export class ModalWrapperComponent implements OnInit {
  @Input() title: string = "";
  @Input() componentToRender!: Type<any>;
  @Input() data?: any;

  @ViewChild("container", { read: ViewContainerRef, static: true })
  container!: ViewContainerRef;

  showModal = true;

  constructor(
    private injector: Injector,
    private activeModal: NgbActiveModal,
    private resolver: ComponentFactoryResolver
  ) {}

  ngOnInit(): void {
    if (this.componentToRender) {
      const factory = this.resolver.resolveComponentFactory(
        this.componentToRender
      );
      const componentRef = this.container.createComponent(factory);

      if (this.data) {
        Object.assign(componentRef.instance, this.data);
      }
    }
  }

  closeModal() {
    this.activeModal.close();
  }
}
