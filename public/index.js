const host ="http://localhost:5000/";
document.querySelector('#get-video-info-btn').addEventListener('click', function (){
  let videoURL = document.querySelector('#videoURL').value.trim();
  if (videoURL.length == 0)
  {
    alert('Please enter youtube video link');
    return;
  }

  fetch(host + 'videoInfo?videoURL=' + videoURL).then(function(res) {
    return res.json();
  }).then(function(data){
    console.log(data);
    let details = {
      thumbnail:document.querySelector(".video-data .thumbnail img"),
      title:document.querySelector(".video-data .info h2"),
      description:document.querySelector(".video-data .info p"),
      videoURL:document.querySelector(".video-data .controls #video-url"),
      downloadOptions:document.querySelector(".video-data .controls #download-options"),
      videoId:document.querySelector(".video-data .controls #video-id")
    }

    let html = "";
    for (let i = 0; i < data.formats.length; i++)
    {
      if (data.formats[i].container == "mp4")
      {
        html += `
        <option value="${data.formats[i].itag}">
          ${data.formats[i].container} - ${data.formats[i].qualityLabel}
        </option>
        `;
        details.thumbnail.src = data.videoDetails.thumbnails[data.videoDetails.thumbnails.length - 1].url;
        details.title.innerText = data.videoDetails.title;
        details.description.innerText = data.videoDetails.description;
        details.videoURL.value = videoURL;
        details.downloadOptions.innerHTML = html;
        details.videoId.value = data.videoDetails.videoId;

        document.querySelector(".video-data").style.display = "block";
        document.querySelector(".video-data").scrollIntoView({
          behavior:"smooth"
        });
      }
    }
  }).catch(function(error){
    alert(error);
  })
});

document.querySelector("#download-btn").addEventListener("click", function() {
  let videoURL = document.querySelector("#video-url").value;
  let videoId = document.querySelector("#video-id").value;
  let itag = document.querySelector("#download-options").value;
  window.open(`${host}download?videoURL=${videoURL}&videoId=${videoId}&itag=${itag}`);
})