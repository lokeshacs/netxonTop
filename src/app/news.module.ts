

import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { NgModule, Component, Injectable, OnInit, } from '@angular/core';
import { CommonModule } from '@angular/common';








/** Artical model */

export interface Source {
  id: string;
  name: string;
}


export interface Article {
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string
  source: Source;

}

// news container coponent 


@Component({
  selector: 'news-container',
  template: `
        <div class = "artical-container"> 
        <div class="artical-item" *ngFor = "let artical of this.articals"> 
            <span> Artical Source : {{artical.source.name}} </span>
            <div> Author {{artical.author}} </div>
            <span> Description {{artical.description}} </span>
            <a href = "{{artical.url}}"> {{artical.title}}
            <img  src={{artical.urlToImage}}   alt="no image found"  style="width:300px;height:200px">
            </a>
            <span> Published at {{artical.publishedAt}} </span>
            <span> Content :  {{artical.content}} </span>
        </div>
         </div>
        <style>
           
            .artical-item{
                margin: 30px;
                overflow: hidden;
                box-shadow: 10px 10px 5px #aaaaaa;
                border : 1px solid gray;
            }
          
            .artical-container{
              margin: 20px;
            }
            img {
              float:right;
            }
        </style>


    `
})

export class NewsContainer implements OnInit {
  public articals: Article[];

  constructor(private _newsService: NewsService) {

  }

  ngOnInit() {
    this._newsService.getAllArticals()
      .subscribe(
        (data: Article[]) => {
          console.log(data);
          this.articals = data;
        }
      ),

      (error) => {
        console.log(error);
      }
  }
}




@NgModule({
  declarations: [NewsContainer],
  imports: [CommonModule],
  exports: [NewsContainer],
  providers: []
})
export class NewsModule {
  constructor() {
    console.log(this);
  }
}


@Injectable({ providedIn: NewsModule })
export class NewsService {
  constructor(private _httpClient: HttpClient) {

  }
  getAllArticals(): Observable<Article[]> {
    return this._httpClient.get<Article[]>(`http://localhost:3000/articles`);
  }
}
