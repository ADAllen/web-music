Bmob.initialize("6a3b16d9a49aadb7205c231e0931ed57", "848173d2ba42cc9a8ea47b3c03dabedc");
const query = Bmob.Query('songs');
query.set("SongName","Bmob")
query.set("singer","爱谁谁")
query.save().then(res => {
  console.log(res)
}).catch(err => {
  console.log(err)
})
const fileUploadControl = document.getElementById('profilePhotoFileUpload');
fileUploadControl.onchange = () => {
  const pic = fileUploadControl.files
  let file
  for(let item of pic){
     file = Bmob.File(item.name, item);
  }
  file.save().then(res => {
    console.log(res.length);
    console.log(res);
  })
}