export function roomNumValidator(roomNum:string) {
    const re = /^-?\d+\.?\d*$/
    if (!roomNum) return "Room number can't be empty."
    if (!re.test(roomNum)) return 'Ooops! We need a valid room number.'
    return ''
  }
  