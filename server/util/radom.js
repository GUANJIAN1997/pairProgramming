const random = function (Min,Max) {
  const Range = Max - Min
  const Rand = Math.random()
  return (Min + Math.round(Rand*Range))
}
module.exports = {
  random:random
}
