import { Component, OnInit } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';
import { ClientResultOldPhotoServices } from 'src/app/pages/client-result/client-result-photo/client-result-photo-old.service';
import { ClientResultServices } from 'src/app/pages/client-result/client-result/client-result.service';

@Component({
  selector: 'app-footer',
  templateUrl: './app-footer.component.html',
  styleUrls: ['./app-footer.component.scss'],
})
export class AppFooterComponent implements OnInit {
  downloadLink: any = '';
  constructor(
    private route: Router,
    private xClientResultServices: ClientResultServices,
    private photoService: ClientResultOldPhotoServices
  ) {}

  ngOnInit() {
    // this.downloadLink =
    //     'https://storage.googleapis.com/rare-lambda-245821.appspot.com/57788_222_3rd_st_Silva_MO_639643064.zip?GoogleAccessId=firebase-adminsdk-rwdun%40rare-lambda-245821.iam.gserviceaccount.com&Expires=2554396200&Signature=DrpS0rOi3BXNqwVXTN6JlfJfRH9PUweSUqZhstKlzavwjrikTGtLioMkypLTxfIG8qUvSWvy32OZzXCzRIURlqZehhkxdV%2BdG0p1DRmqsfpRe7HCflrspr7s3NojD8P2wguqEgP0uVDuR%2BJLBlunlkZmzoOK6ctFYzwCNGggxfjinNDHlgOziWoGeRPKzko0hTl9QSSZo4lD9%2BpHvz9KYVR5k0Fb37mihq1aNGe9P9Q7XVmQSmz6yePTwAJ3JvAW1rOy%2FUXETi2EMv1t2lKpeaVo9CkiFIhn8PzKSj0tZPTtN4G%2FgnGv97JGBDyf%2BZr61h2OqFwQgpvHsBKdceLj1A%3D%3D';    
  }

  
}
