const api_key=`AIzaSyAGn1l7FmyrHQV3xdtgWgma6lSlf14qogA`

const Data1=JSON.parse(localStorage.getItem('movies')) || []

const searchVideos= async ()=>{

    try{
        const query=document.getElementById('videos').value

        const res=await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${query}&key=${api_key}`)


        const data=await res.json()

        const actualData=data.items
        append(actualData)
        // console.log(actualData)
    }catch(err){
        console.log(err)
    }
    
} 

const append=(data) =>{

    const data_div=document.getElementById('container') 
    data_div.innerHTML=null;
    
    data.forEach(({ snippet,id }) => {

        const title_name=snippet.title
        // console.log(title_name)

        const channel=snippet.channelTitle
        

        const videoID=id.videoId

        const thumbnail=snippet.thumbnails.high.url


        let div=document.createElement("div")
        let dataObj={
                videoID,
                snippet,
            };

        div.onclick=()=>{

           

            localStorage.setItem('clicked_item',JSON.stringify(dataObj))  
            window.location.href="videos.html"  
        }

        
        let channel_html=document.createElement('h4')
        channel_html=channel
        channel_html.fontSize="20px"
        

        let title_html=document.createElement('h3')
        title_html=title_name
        title_html.color="white"


        let img=document.createElement('img')
        img.src=thumbnail;
        // img.addEventListener('click',()=>{

        //     Data1.push(snippet)
        //     localStorage.setItem('movies',JSON.stringify(Data1))
        //     window.location.href="videos.html"
        // })
        div.append(img,channel_html,title_html)
        data_div.append(div);

    })
    
}

const defaultFunction= async ()=>{

    try{
        const res2 =await fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=In&key=${api_key}`)

        const data2=await res2.json()

        const actualDefaultData=data2.items

        console.log(actualDefaultData)
        defaultAppend(actualDefaultData)
    }catch(err){
        console.log(err)
    }
    
}
window.addEventListener('load',()=>{
    let main=document.getElementById('query').value
    if(query!=""){
        searchVideos()
    }else{
        defaultFunction()
    }
})

const defaultDiv=document.getElementById('default')
const defaultAppend = (data2)=>{
    defaultDiv.innerHTML=null

    data2.forEach(({snippet,id})=>{
        const div=document.createElement('div')

        const title = snippet.title;

        const videoId= id;

        const thumbnail = snippet.thumbnails.high.url;

        const channel_name = snippet.channelTitle;

        let img=document.createElement('img')
        img.src=thumbnail

        

        let channel_html=document.createElement('h4')
        channel_html.innerText=channel_name

        let title_name=document.createElement('h3')
        title_name.innerText=title

        let data={
            videoId,
            snippet,
        }

        div.onclick=()=>{
            storeClickedvideo(data)
        }
        div.append(img,title_name,channel_html)
        defaultDiv.append(div)

    })
   
}
    const storeClickedvideo=(data)=>{
    

    //store data in LS

   localStorage.setItem("clicked_item",JSON.stringify(data))

   window.location.href="video.html"



}

// let menuIcon=document.querySelector(".nav1")
// let sidebar=document.querySelector(".sidebar")


// menuIcon.onclick=()=>{
//     sidebar.classList.toggle("small-sidebar");
// }