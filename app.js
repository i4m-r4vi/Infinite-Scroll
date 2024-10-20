const clientAPI="pSo5mDpTZPDyPKgHHVp6uRrkw4lwOmaPh9qNFTCG5kA"
const count="20"
const apiUrl=`https://api.unsplash.com/photos/random/?client_id=${clientAPI}&count=${count}`
const image_container=document.getElementById('image_container');
let photosArray=[]

function displayPhotos(){
    photosArray.forEach((photos)=>{
        function setAttribute(elements,attribute){
            for (let keys in attribute){
                elements.setAttribute(keys,attribute[keys])
            }
        }

        let anchorTag=document.createElement('a');
        setAttribute(anchorTag,{
            'href':photos.links.html,
            'target':'_blank'
        })

        let image=document.createElement('img');
        setAttribute(image,{
            'src':photos.urls.regular,
            'alt':image.alt_description,
            'title':image.alt_description
        })
        anchorTag.appendChild(image)
        image_container.appendChild(anchorTag)
    })
}

async function getPhotos() {
    try{
        const response=await fetch(apiUrl);
        photosArray=await response.json()
        displayPhotos()
    }
    catch (e){
        console.log(e);
    }
}

//  Check to see if scrolling near bottom of pae, load more photos
window.addEventListener('scroll',()=>{
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight){
        getPhotos()
    }
})

getPhotos()
