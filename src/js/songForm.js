{
    let view={
        el:'.page>main',
        init(){
            this.$el=$(this.el)
        },
        template:`
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
            if(data.objectId){
                $(this.el).prepend('<h1>编辑歌曲</h1>')
            }else{
                $(this.el).prepend('<h1>新建歌曲</h1>')
            }
        },
        reset(){
            this.render({})
        }
        
    }
    let model={
        data:{
            name:'',singer:'',url:'',objectId:'',
        },
        create(data){
            const query = Bmob.Query('songs')
        query.set("name",data.name)
        query.set("singer",data.singer)
        query.set("url",data.url)
        return query.save().then(res => {
            data.objectId=res.objectId
            Object.assign(this.data,{...data})

        }).catch(err => {
          console.log(err)
        })

        },
        update(data){
            const song = Bmob.Query('songs');
            song.set('id', this.data.objectId) //需要修改的objectId
            song.set('name', data.name)
            song.set('singer', data.singer)
            song.set('url', data.url)
          return song.save().then((response)=>{
              Object.assign(this.data,data)
              return response
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
           
            window.eventHub.on('select',(data)=>{
                this.model.data=data
                this.view.render(this.model.data)
            })
            window.eventHub.on('new',(data)=>{
              if(this.model.data.objectId){
                    this.model.data={
                        name:'',url:'',objectId:'',singer:''
                    }
                }else{Object.assign(this.model.data=data,data)}
                
                this.view.render(this.model.data)
            })
        },
       
        create(){
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
        },
        update(){
            let needs='name singer url'.split(' ')
            let data={}
            needs.map((string)=>{
                data[string]=
                this.view.$el.find(`[name="${string}"]`).val()
            })
            this.model.update(data).then(()=>{
                alert('updata success')
                window.eventHub.emit('update',JSON.parse(JSON.stringify(this.model.data)))
            })
            
            
        },
        bindEvents(){
            this.view.$el.on('submit','form',(e)=>{
                e.preventDefault()
                if(this.model.data.objectId){
                    this.update()
                }else{
                    this.create()
                }

               
                
            })

        }

    }
    controller.init(view,model)
    

}