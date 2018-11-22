const toHexString = byteArray =>
  byteArray.map(byte => ('0' + (byte & 0xff).toString(16)).slice(-2)).join('')

export default {
  toHexString
}
