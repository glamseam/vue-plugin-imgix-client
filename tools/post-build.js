import fs from 'fs-extra'
import path from 'path'

const filterSFC = (src) => {
    if (!path.extname(src)) {
        return true
    }

    return path.extname(src).toLowerCase() === '.vue'
}

const copySrc = () => {
    fs.copy('src/components', 'dist/components', { filter: filterSFC })
        .then(() => {
            console.log('Finished copy')
        })
        .catch((error) => {
            console.error(error)
        })
}

const main = () => {
    copySrc()
}

main()
