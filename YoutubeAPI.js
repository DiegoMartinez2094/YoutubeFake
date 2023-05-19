async function buscar() {
    const buscar = document.getElementById("buscar").value;
    const url = `https://youtube138.p.rapidapi.com/search/?q=${buscar}&hl=en&gl=US`;
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '599ad8790amshd1d3b94f81aa75bp1b3480jsn2a9eccbde1e6',
        'X-RapidAPI-Host': 'youtube138.p.rapidapi.com'
    }
};
try {
    
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);
    const id = result.contents[0].video.videoId;
    const rela = result.contents[1].video.videoId;
    const rela2 = result.contents[2].video.videoId;
    const rela3 = result.contents[3].video.videoId;
    const nombreVideo=result.contents[0].video.title;
    const views=result.contents[0].video.stats.views;
    const descripcion=result.contents[0].video.descriptionSnippet;
    const nombreCanal=result.contents[0].video.author.title;
    const avatarCanal=result.contents[0].video.author.avatar[0].url;
    

    console.log(avatarCanal)
    comentarios(id)
    document.getElementById("avatarCanal").innerHTML = `<img src="${avatarCanal}" alt="">`;
    document.getElementById("nombreCanal").innerHTML = `<h1>${nombreCanal}</h1>`;
    document.getElementById("video").innerHTML = `<iframe width="800px" height="500px" src="https://www.youtube.com/embed/${id}"
     frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
     
     document.getElementById("relacionado").innerHTML = `<iframe width="200px" height="100px" src="https://www.youtube.com/embed/${rela}"
     frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;

     document.getElementById("relacionado2").innerHTML = `<iframe width="200px" height="100px" src="https://www.youtube.com/embed/${rela2}"
     frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;

     document.getElementById("relacionado3").innerHTML = `<iframe width="200px" height="100px" src="https://www.youtube.com/embed/${rela3}"
     frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
     
     document.getElementById("nombreVideo").innerHTML = `<h1>${nombreVideo}</h1>`;
     document.getElementById("views").innerHTML = `<h6>visualizaciones: ${views}</h6>`;
     document.getElementById("descripcion").innerHTML = `<h6><b>DESCRIPCION:</b> ${descripcion}</h6>`;
} catch (error) {
    console.error(error);
}

}

async function comentarios(id) {
    const url = `https://youtube138.p.rapidapi.com/video/comments/?id=${id}&hl=es&gl=US`;
    const options = {
      headers: {
        'X-RapidAPI-Key': '599ad8790amshd1d3b94f81aa75bp1b3480jsn2a9eccbde1e6',
        'X-RapidAPI-Host': 'youtube138.p.rapidapi.com'
      }
    };
  
    try {
      const response = await fetch(url, options);
      const result = await response.json();
    //   console.log(result);
  
      const comentariosContainer = document.getElementById("comentarios");
      comentariosContainer.innerHTML = "<h5 style='color: red; text-align: center;'>COMENTARIOS:</h5>";
  
      const listaComentarios = document.createElement("ul");
      listaComentarios.style.overflow = "auto";
      listaComentarios.style.height = "400px";
  
      for (const comentario of result.comments) {
        const content = comentario.content;
        const autor = comentario.author.title;
        const comentarioHTML = `<li><h6><b>${autor}:</b> ${content}</h6></li>`;
        listaComentarios.innerHTML += comentarioHTML;
      }
  
      comentariosContainer.appendChild(listaComentarios);
    } catch (error) {
      console.error(error);
    }
  }
