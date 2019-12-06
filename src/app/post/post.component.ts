import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  imgPreview;

  newPost = this.fb.group({
    title: ['', [Validators.required]],
    description: ['', [Validators.required]],
    url: ['', [Validators.required]]
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  }

  postSubmit(){

  }

  imagePicked(event){
    const file = (event.target as HTMLInputElement).files[0];
    this.newPost.patchValue({url: file});
    this.newPost.get('url').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imgPreview = reader.result;
    }
    reader.readAsDataURL(file);
    console.log(this.newPost.value);
  }

}
