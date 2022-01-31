import { Component, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { contentSize } from '../create-post/ContentSize.validator';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent implements OnInit {
  editPostForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<EditPostComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.editPostForm = this.formBuilder.group({
      title: [
        this.data.title,
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(15),
        ],
      ],
      description: [this.data.description],
      content: [this.data.content, [Validators.required, contentSize()]],
      imgURL: [this.data.imgURL],
      uploadDate: [this.data.uploadDate],
      author: [this.data.author],
      id: [this.data.id]    });
    console.log(this.editPostForm)
    this.editPostForm.valueChanges.subscribe(x=>console.log(x))
  }
  cancelClick() {
    this.dialogRef.close();
  }
}
