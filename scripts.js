/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input")
const searchButton = document.querySelector("#searchbar > button")

const lookup = {"/":"/","deepl":"https://deepl.com/","reddit":"https://reddit.com/","maps":"https://maps.google.com/"}
const engine = "duckduckgo"
const engineUrls = {
  deepl: "https://www.deepl.com/translator#-/-/{query}",
  duckduckgo: "https://duckduckgo.com/?q={query}",
  ecosia: "https://www.ecosia.org/search?q={query}",
  google: "https://www.google.com/search?q={query}",
  startpage: "https://www.startpage.com/search?q={query}",
  youtube: "https://www.youtube.com/results?q={query}",
}

const isWebUrl = value => {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

const getTargetUrl = value => {
  if (isWebUrl(value)) return value
  if (lookup[value]) return lookup[value]
  const url = engineUrls[engine] ?? engine
  return url.replace("{query}", value)
}

const search = () => {
  const value = searchInput.value
  const targetUrl = getTargetUrl(value)
  window.open(targetUrl, "_self")
}

searchInput.onkeyup = event => event.key === "Enter" && search()
searchButton.onclick = search

/**
 * inject bookmarks into html
 */

const bookmarks = [{"id":"q9gBpR5i3zJwV86r","label":"Socials","bookmarks":[{"id":"lWpKooWwXVQ4Zso1","label":"Discord","url":"https://discord.com/app"},{"id":"V2xIE9wKlLxTxxUY","label":"Reddit","url":"https://www.reddit.com/"},{"id":"gWy47FyQu7x1Bkon","label":"Twitter","url":"https://x.com/home"},{"id":"2BRlTmaskcxfkkxU","label":"WhatsApp","url":"https://web.whatsapp.com/"}]},{"id":"yksvZUeVZdvRoxF8","label":"AniManga","bookmarks":[{"id":"iR27ZdOdlvIBkeJ8","label":"Nyaa","url":"https://nyaa.si/"},{"id":"3yEp48FCcIZW8paW","label":"Anilist","url":"https://anilist.co/home"},{"id":"zm5AbMg0Z5sSO6fA","label":"Novelupdates","url":"https://www.novelupdates.com/"},{"id":"FXROwY3zK4BnFQfi","label":"Mangaupdates","url":"https://www.mangaupdates.com/"}]},{"id":"z27AMaUDAJX1nnvZ","label":"Media","bookmarks":[{"id":"TEF08ZDF1AmPabbx","label":"Plex","url":"https://app.plex.tv/"},{"id":"D1k2ihBKvsMqg2Wk","label":"Kavita","url":"https://kavita.subby.dev/"},{"id":"Ce8QC5rpbUwqJI2p","label":"Komga","url":"https://komga.subby.dev/"},{"id":"M5B2Egz2fEytW2wq","label":"YouTube","url":"https://www.youtube.com/"}]},{"id":"Y1U5nWJIjS4X8g0u","label":"Misc","bookmarks":[{"id":"KiLeqkP33nDQJtf2","label":"FMHY","url":"https://fmhy.net/"},{"id":"mLJuCq3Gzdhqdy09","label":"G-Drive","url":"https://drive.google.com/"},{"id":"nM8I6g00WlO6o1gj","label":"Google Docs","url":"https://docs.google.com/document/u/0/"},{"id":"cMBnz0C8yuLg2TMK","label":"Google Sheets","url":"https://docs.google.com/spreadsheets/u/0/"}]}]

const createGroupContainer = () => {
  const container = document.createElement("div")
  container.className = "bookmark-group"
  return container
}

const createGroupTitle = title => {
  const h2 = document.createElement("h2")
  h2.innerHTML = title
  return h2
}

const createBookmark = ({ label, url }) => {
  const li = document.createElement("li")
  const a = document.createElement("a")
  a.href = url
  a.innerHTML = label
  li.append(a)
  return li
}

const createBookmarkList = bookmarks => {
  const ul = document.createElement("ul")
  bookmarks.map(createBookmark).forEach(li => ul.append(li))
  return ul
}

const createGroup = ({ label, bookmarks }) => {
  const container = createGroupContainer()
  const title = createGroupTitle(label)
  const bookmarkList = createBookmarkList(bookmarks)
  container.append(title)
  container.append(bookmarkList)
  return container
}

const injectBookmarks = () => {
  const bookmarksContainer = document.getElementById("bookmarks")
  bookmarksContainer.append()
  bookmarks.map(createGroup).forEach(group => bookmarksContainer.append(group))
}

injectBookmarks()
