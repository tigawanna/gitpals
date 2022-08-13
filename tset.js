
const str = "https://github.com/tigawanna/pitch"
const token= "gulag"
const authedurl = (url,token) =>{
    return url.slice(0, 8) + token + '@' +url.slice(8)
}

console.log(authedurl(str,token))
