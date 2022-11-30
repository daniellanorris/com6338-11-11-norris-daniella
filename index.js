const getPoemBtn = document.getElementById('get-poem')
const poemEl = document.getElementById('poem')
const poemURL = 'https://poetrydb.org/random,linecount/1;12/author,title,lines.json'

const getJSON = url => fetch(url).then(res => res.json())

const pipe = (...fns) => firstArg => fns.reduce((returnValue, fn) => fn(returnValue), firstArg)

const makeTag = tag => str => `<${tag}>${str}</${tag}>`

// complete this function
const makePoemHTML = (data) => {
  var output = ''
  // var lines = data[0].lines
  // var author = data[0].author
  // var title = data[0].title

  // es6 method for same thing above
  const [{author, lines, title}] = data

  output +=
    makeTag(`h2`)(title) +
    pipe(makeTag(`em`), makeTag(`h3`))(`by ` + author)

  var joinLines = arr => arr.join(`<br>`)
  var splitLines = str => str.split(`<br><br>`)

  var makeParagraphInput = pipe(joinLines, splitLines)
  var makeParagraph = makeTag(`p`)

  console.log(makeParagraphInput(lines))
  var paragraphArray = makeParagraphInput(lines).map(str => makeParagraph(str))

  var paragraphString = paragraphArray.join(``)

  output +=
    paragraphString
    
  console.log(data)
  
  return output
}

// attach a click event to #get-poem
getPoemBtn.onclick = async function () {
  // renders the HTML string returned by makePoemHTML to #poem
  poemEl.innerHTML = makePoemHTML(await getJSON(poemURL))
}
