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
                    <input name="name" type=text value="__name__">
                </lavel>
            </div>
            <div class="row">
                    <lavel>
                        歌手
                        <input name="singer" type=text value="__singer__" >
                    </lavel>
                </div>
                <div class="row">
                        <lavel>
                            外链
                            <input name="url" type=text value="__url__">
                        </lavel>
                    </div>       
            <div class="row">
                    <label for="sub" class="ui-sub">保存</label>
                    <input type="submit" id="sub"   style="display: none;" />
            
            
                
            </div>             
        </form>`,
        render(data={}){
            let placeholders=['name','url','singer','id']
            let html=this.template
            placeholders.map((string)=>{
                html=html.replace(`__${string}__`,data[string] ||'')
            })
            $(this.el).html(html)
        },
        reset(){
            this.render({})
        }
        
    }
    let model={
        data:{
            name:'',singer:'',url:'',id:'',
        },
        create(data){
            const query = Bmob.Query('songs')
        query.set("name",data.name)
        query.set("singer",data.singer)
        query.set("url",data.url)
        return query.save().then(res => {
            data.id=res.objectId
            Object.assign(this.data,{...data})

        }).catch(err => {
          console.log(err)
        })

        }
        
    }
    let controller={
        init(view,model){
            this.view=view
            this.view.init()

            this.model=model
            this.view.render(this.model.data)
            this.bindEvents()
            window.eventHub.on('upload',(data)=>{
                this.model.data=data
                console.log(data)
                this.view.render(this.model.data)
                

            })
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
                    
                    this.view.reset()
                    let string=JSON.stringify(this.model.data)//深拷贝
                    let object=JSON.parse(string)

                    window.eventHub.emit('create',object)
                })
                
            })

        }

    }
    controller.init(view,model)
    

}