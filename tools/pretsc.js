const fs = require('fs-extra')
const path = require('path')

const filterSFC = (src) => {
    if (!path.extname(src)) {
        return true
    }

    return path.extname(src).toLowerCase() === '.vue'
}

const copySrc = () => {
    fs.copy('src', 'dist', { filter: filterSFC })
        .then(() => {
            console.log('Finished copy')
        })
        .catch((error) => {
            console.error(error)
        })
}

const main = () => {
    fs.remove('dist')
        .then(() => {
            console.log('Removed')
            copySrc()
        })
        .catch((error) => {
            throw new Error(error)
        })
}

main()
