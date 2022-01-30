import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Users } from 'src/models/users';
import { AccountServiceService } from 'src/services/account-service.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
})
export class CreatePostComponent implements OnInit {
  createPostForm!: FormGroup;
  author: string|undefined;
  constructor(private formBuilder: FormBuilder, public accountService:AccountServiceService,public dialogRef: MatDialogRef<CreatePostComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}
  private base64textString:String="";
  imageArray!:string[];
  fileSubmit = false;
  disableSubmit = true;
  ngOnInit(): void {
    this.createPostForm = this.formBuilder.group({
      title: [null, [Validators.required,Validators.minLength(5),Validators.maxLength(15)]],
      description: [null],
      content: [null, Validators.required],
      imgURL: [null],
      uploadDate: [null],
      author: [null],
      id:[null]
    });
    this.imageArray = [];
    this.setAuthor();
    // this.createPostForm.controls['imgURL'].setErrors(null)
    this.createPostForm.statusChanges.subscribe(x=>{
      console.log(x)
    })
  }

  fileChoosen(event: any) {
    let files = event.target.files;
    let file = files[0]
    if(file.size>2048000){
      this.createPostForm.controls['imgURL'].setErrors({filesize: true})
      return;
    }
    this.createPostForm.setErrors(null);
    if(files && file){
      let reader = new FileReader();
      reader.onload = this._handlereaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  }
  _handlereaderLoaded(readerEvent:any){
    var binaryString= readerEvent.target.result;
    this.base64textString = btoa(binaryString);
    const image = btoa(binaryString)
    this.createPostForm.controls["imgURL"].setValue(image);
    this.disableSubmit=false;
  }
  shorten(){
    let string= this.createPostForm.controls["content"].value;
    let shortenedString = string.split(" ").splice(0,60).join(" ");
    this.createPostForm.controls["description"].setValue(shortenedString)

  }
  getDate(){
    let currentDate= new Date;
    let date = currentDate.getFullYear()+'-'+(currentDate.getMonth()+1)+'-'+currentDate.getDate();
    let time = currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
    let uploadDate = date + " " + time
    this.createPostForm.controls["uploadDate"].setValue(uploadDate)

  }
  setAuthor(){
    this.accountService.getUserAuthor().subscribe((x:Users)=>
    {this.createPostForm.controls["author"].setValue(x.fullName)})

  }
  savePost(){
    this.setAuthor();
    this.shorten();
    this.getDate();
  }

cancelClick(){
  this.dialogRef.close();
}

}
