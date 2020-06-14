import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GlobleService } from '../../../../service/globle.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
declare var $;



@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  defaultContent = []
  id = ""
  @Input("tabledata") tabledata: any;
  @Output() btnaction = new EventEmitter<any>();
  constructor(private service: GlobleService,  private route: ActivatedRoute,private http: HttpClient) { 
    this.route.params.subscribe(a => {
      if (a.id) {
      this.id = "/"+a.id
      }
  })
  }
    ngOnInit() {
      if(this.tabledata.buttons.length>0)
      {
        this.tabledata.buttons.forEach(element => {
          var h = '<button  title="' + element.title + '" class="' + element.class + '" data-type="' + element.type + '"><i class="' + element.icon + '"></i>'+element.title+'</button> ';
          this.defaultContent.push(h);
      });
      }

      var _self = this;
    $(()=>{
      var table = $("#mytableid").DataTable({

        searching: false,
        processing: true,
        serverSide: true,
        ordering: false,
        paginate:false,
        paging:false,
        info:false,
        
        "ajax": {
          url: _self.service.apiUrl + _self.tabledata.modulename +_self.id,
          data: {
          },
          type: "GET",
          headers: { 'Authorization': 'Bearer ' + _self.service.token },
        },
        "columnDefs": [
          {
            "targets": -1,
            "data": null,
            "defaultContent": _self.defaultContent.join(' '),
          },
        ]
      });
      $('#mytableid tbody').on('click', 'button', function () {

          var data = { type: $(this).data("type"), data: table.row($(this).parents('tr')).data(), index: table.row($(this).parents('tr')).index() };
          _self.sendMessage(data);
          table.ajax.reload();
      });
      $('#fil').on('change', function () {
        table.ajax.reload();
      })
      $('#filter').on('change', function () {
        table.ajax.reload();
      })
      $('#catFilter').on('change', function () {
        table.ajax.reload();
      })
    })

  }
  sendMessage(data) {
    this.btnaction.emit(data);
  }
  logout()
  {
    this.service.logout();
  }

}
