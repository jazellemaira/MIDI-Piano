const NOTE_DETAILS = [
  //variable name is All UPPERCASE since it's a constant variable
  { note: "C", key: "Z", frequency: 261.626 },
  { note: "Db", key: "S", frequency: 277.183 },
  { note: "D", key: "X", frequency: 293.665 },
  { note: "Eb", key: "D", frequency: 311.127 },
  { note: "E", key: "C", frequency: 329.628 },
  { note: "F", key: "V", frequency: 349.228 },
  { note: "Gb", key: "G", frequency: 369.994 },
  { note: "G", key: "B", frequency: 391.995 },
  { note: "Ab", key: "H", frequency: 415.305 },
  { note: "A", key: "N", frequency: 440 },
  { note: "Bb", key: "J", frequency: 466.164 },
  { note: "B", key: "M", frequency: 493.883 },
]
//pressing a key down
document.addEventListener("keydown", (e) => {
  if (e.repeat) return
  /*guard clause - if statement that returns from the function early
                 - always on the top of a function
                 - ignores the repeat property for keydown */
  const keyboardKey = e.key.toUpperCase()
  const noteDetail = getNoteDetail(keyboardKey)

  if (noteDetail == null) return //check if note is equal to null, exit if it is null
  noteDetail.active = true //if it is in the array, mark it as active - being played
  playNotes() //function that makes the sound be produced
})

//releasing a key up
document.addEventListener("keyup", (e) => {
  const keyboardKey = e.key.toUpperCase()
  const noteDetail = getNoteDetail(keyboardKey)

  if (noteDetail == null) return
  noteDetail.active = false
  playNotes()
})

//getting the individual note that is playing based on the key that is pressed
function getNoteDetail(keyboardKey) {
  return NOTE_DETAILS.find((n) => n.key === keyboardKey)
  //find method - finding one individual note from the array of notes
  //"key${n.key}" - creating an new string of the actual note being checked
}

function playNotes() {
  console.log("play notes")
}
