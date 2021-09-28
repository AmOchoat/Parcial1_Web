const route = 'https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json'

function getData(url, callback){
    fetch(url)
      .then(res => res.json())
      .then(res => callback(res))
}

function loadNavBar(data){
    const navBar = document.getElementById("navbar")
    navBar.innerHTML = ""

    for( const item of data){
        const nav_item = document.createElement("li")
        const nav_link = document.createElement("a")
        nav_link.className = "nav-link"
        nav_link.textContent = item.name
        nav_item.appendChild(nav_link)
        navBar.appendChild(nav_item)
        
    }

    
}




getData(route, loadNavBar)