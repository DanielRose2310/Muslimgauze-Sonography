import {Track} from './tracksClass.js'
import {admin} from './app.js'
    export const doTable = async (_data,_page=0) => {

        if (admin===true){$("#editcol").show();
            $("#adminadd").show()}
    
        $(".spinner").empty()
        if (!_data.length){$("#popupmodal").hide().fadeIn().css('display','flex')
        $(".modal__window").html(`<h2>No matches found</h2>`)
        $(window).click(function() {
            
            $("#popupmodal").show().hide();
        })
    }
else {        $("#id_parent").empty()


        _data.slice(_page*10,_page*10+10).map(async item => {
            let track = new Track(item.title, item.releases[0]?.albumtitle,item.releases[0]?.albumyear,item.releases[0]?.albumformat,item.releases[0]?.albumcatalogue,
            item.releases[1]?.albumtitle,item?.releases[1]?.albumyear,item?.releases[1]?.albumformat,item?.releases[1]?.albumcatalogue,
            item?.releases[2]?.albumtitle,item?.releases[2]?.albumyear,item?.releases[2]?.albumformat,item?.releases[2]?.albumcatalogue, item._id
            )

        })
        let pages = Math.floor(_data.length/10)
        $(".pagination").empty()
        if (_page>0){$(".pagination").append(`<h5 class="pagin" data-num=0>&laquo;</h5>`)}
        if (_page>3 && pages<_page+3){$(".pagination").append(`<h5 class="pagin" data-num=${_page-4}>${_page-3}</h5>`)}
        if (_page>2 && pages<_page+2){$(".pagination").append(`<h5 class="pagin" data-num=${_page-3}>${_page-2}</h5>`)}
        if (_page>1){$(".pagination").append(`<h5 class="pagin" data-num=${_page-2}>${_page-1}</h5>`)}
        if (_page>0){$(".pagination").append(`<h5 class="pagin" data-num=${_page-1}>${_page}</h5>`)}
        $(".pagination").append(`<h5 class="pagin" data-num=${_page}><u>${_page+1}</u></h5>`)
        if (pages>_page+1){$(".pagination").append(`<h5 class="pagin" data-num=${_page+1}>${_page+2}</h5>`)}
        if (pages>_page+2){$(".pagination").append(`<h5 class="pagin" data-num=${_page+2}>${_page+3}</h5>`)}
        if (_page<2 && pages>_page+3){$(".pagination").append(`<h5 class="pagin" data-num=${_page+3}>${_page+4}</h5>`)}
        if (_page<1 && pages>_page+4){$(".pagination").append(`<h5 class="pagin" data-num=${_page+4}>${_page+5}</h5>`)}
        if (_page<pages){$(".pagination").append(`<h5 class="pagin" data-num=${pages}> &raquo;</h5>`)}
        $(".pagin").on('click',function(){
            doTable(_data,$(this).data("num"))
        })
    }
}