import { Component } from "@angular/core";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {Errors} from "./contact-form.component.model";

@Component({
  selector: "app-contact-form",
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgIf,
  ],
  templateUrl: "./contact-form.component.html",
  styleUrl: "./contact-form.component.sass"
})
export class ContactFormComponent {

  EmailPattern = new RegExp("^[-!#$%&'*+\\/0-9=?A-Z^_a-z`{|}~](\\.?[-!#$%&'*+\\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\\.?[a-zA-Z0-9])*\\.[a-zA-Z](-?[a-zA-Z0-9])+$")
  justNumbersPattern = new RegExp('^[0-9]+$')
  submitted = false

  userForm = new FormGroup(  {
    name: new FormControl("", Validators.required),
    surname: new FormControl("", Validators.required),
    email: new FormControl("", [Validators.required, Validators.pattern(this.EmailPattern)]),
    telephone: new FormControl("", [Validators.required, Validators.pattern(this.justNumbersPattern)]),
    message: new FormControl("", [Validators.required, Validators.maxLength(100)]),
    terms: new FormControl(false, Validators.requiredTrue)
  })

  get name() {
    return this.userForm.get("name") as FormControl
  }

  get surname() {
    return this.userForm.get("surname") as FormControl
  }

  get email() {
    return this.userForm.get("email") as FormControl
  }

  get telephone() {
    return this.userForm.get("telephone") as FormControl
  }

  get message() {
    return this.userForm.get("message") as FormControl
  }

  get terms() {
    return this.userForm.get("terms") as FormControl
  }

  get isInvalidForm(): boolean {
    return this.userForm.invalid
  }

  submitForm(): void {

    if (this.userForm.invalid)
      return

    console.log("Form submitted!")
    console.log(this.userForm.value)
    this.submitted = true

    setTimeout((): void => {
      console.log("Reset form")

      Object.values(this.userForm.controls).forEach((field: FormControl): void => {
        if (typeof field.value === "string") {
          field.setValue("")
        } else if (typeof field.value === "boolean") {
          field.setValue(false)
        }
        field.markAsPristine()
      })

      this.submitted = false

    }, 4000)
  }

  // Errors messages
  protected readonly Errors = Errors;
}
