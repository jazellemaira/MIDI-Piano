const audioContext = new AudioContext()

const NOTE_DETAILS = [
  //variable name is All UPPERCASE since it's a constant variable
  { note: "C", key: "Z", frequency: 261.626, active: false },
  { note: "Db", key: "S", frequency: 277.183, active: false },
  { note: "D", key: "X", frequency: 293.665, active: false },
  { note: "Eb", key: "D", frequency: 311.127, active: false },
  { note: "E", key: "C", frequency: 329.628, active: false },
  { note: "F", key: "V", frequency: 349.228, active: false },
  { note: "Gb", key: "G", frequency: 369.994, active: false },
  { note: "G", key: "B", frequency: 391.995, active: false },
  { note: "Ab", key: "H", frequency: 415.305, active: false },
  { note: "A", key: "N", frequency: 440, active: false },
  { note: "Bb", key: "J", frequency: 466.164, active: false },
  { note: "B", key: "M", frequency: 493.883, active: false },
]
//pressing a key down
document.addEventListener("keydown", (e) => {
  if (e.repeat) return
  /* guard clause - if statement that returns from the function early
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
  //adding different classes to the notes
  NOTE_DETAILS.forEach((n) => {
    const keyElements = document.querySelectorAll(`[data-note = "${n.note}"]`)
    keyElements.forEach((e) => e.classList.toggle("active", n.active)) //make the note being played to active
    /* if default active value is not set or undefined use:
                    n.active || false --- if n.active is undefined set it to false */
    if (n.oscillator != null) {
      //stop note if note oscillator is null
      n.oscillator.stop() //stops the noise
      n.oscillator.disconnect() //removes from the audio context so that there are no dead oscillators connected
    }
  })

  //get active notes and play sound
  const activeNotes = NOTE_DETAILS.filter((n) => n.active) //active set to true
  const gain = 1 / activeNotes.length //determines what percentage of volume a note should be played
  activeNotes.forEach((n) => {
    startNote(n, gain)
  })
}

//function that plays the note
function startNote(noteDetail, gain) {
  const gainNode = audioContext.createGain() //gain node determines the volume of an output
  gainNode.gain.value = gain
  const oscillator = audioContext.createOscillator() //makes brand new oscillator
  //oscillator allows to play a note at a specific frequency
  oscillator.frequency.value = noteDetail.frequency //hook up oscillator with note details
  oscillator.type = "sine"
  oscillator.connect(gainNode).connect(audioContext.destination) //connect oscillator to audio context --- speakers
  oscillator.start()
  noteDetail.oscillator = oscillator //---> this makes the variable globally accessible
  //saves reference to oscillator to so the sound stops playing when something else is done
}
