{
    let view={
        el:'.page>main',
        init(){
            this.$el=$(this.el)
        },
        template:`<h1>新建歌曲</h1>
        <form action="" class="songForm">
            <div class="row">
                <lavel>
                    歌名
                    <input name="name" type=text value="__key__">
                </lavel>
            </div>
            <div class="row">
                    <lavel>
                        歌手
                        <input name="singer" type=text >
                    </lavel>
                </div>
                <div class="row">
                        <lavel>
                            外链
                            <input name="url" type=text value="__link__">
                        </lavel>
                    </div>       
            <div class="row">
                    <label for="sub" class="ui-sub">保存</label>
                    <input type="submit" id="sub"   style="display: none;" />
            
            
                
            </div>             
        </form>`,
        render(data={}){
            let placeholders=['key','link']
            let html=this.template
            placeholders.map((string)=>{
                html=html.replace(`__${string}__`,data[string] ||'')
            })
            $(this.el).html(html)
        }
        
    }
    let model={
        data:{
            name:'',singer:'',url:'',id:'',
        },
        create(data){
            const query = Bmob.Query('songs')
        query.set("SongName",data.name)
        query.set("singer",data.singer)
        query.set("url",data.url)
        query.save().then(res => {
           
          console.log(res)
        }).catch(err => {
          console.log(err)
        })

        }

    }
    let controller={
        init(ciew,model){
            this.view=view
            this.view.init()

            this.model=model
            this.view.render(this.model.data)
            this.bindEvents()
            window.eventHub.on('upload',(data)=>{
                this.reset(data)

            })
        },
        reset(data){
            this.view.render(data)
        },
        bindEvents(){
            this.view.$el.on('submit','form',(e)=>{
                e.preventDefault()
                let needs='name singer url'.split(' ')
                let data={}
                needs.map((string)=>{
                    data[string]=
                    this.view.$el.find(`[name="${string}"]`).val()
                })
                this.model.create(data)
                .then(()=>{
                    this
                })
            })

        }

    }
    controller.init(view,model)

}