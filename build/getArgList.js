module.exports = function getArgList() {
  let argvs
  let res = {}
  try {
    argvs = JSON.parse(process.env.npm_config_argv).original
  } catch (ex) {
    argvs = process.argv
  }
  let argv = argvs.slice(2)
  for (let i in argv) {
    let key = argv[i].match(/--(\S*)=/)[1]
    let value = argv[i].split('=')[1]
    res[key] = value
  }
  return res
}
