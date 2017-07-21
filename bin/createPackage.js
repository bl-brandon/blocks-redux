// Core
import chalk from 'chalk'
import path from 'path'
import fs from 'fs-extra'

// Inspired by:
// https://github.com/callemall/material-ui/blob/next/scripts/copy-files.js

const createPackage = () => {
  console.log(chalk.yellow('[build] Creating build package...'))
  console.log(chalk.yellow('[build] Copying package files...'))

  fs.readJson(path.resolve(__dirname, '../package.json'), (err, obj) => {
    if (err) throw err

    const {
      version,
      description,
      repository,
      license,
      dependencies } = obj

    const minifiedPackage = {
      name: 'blocks-redux',
      version,
      description,
      repository,
      main: './index.js',
      license,
      dependencies
    }

    fs.writeFile(path.resolve(__dirname, '../build/package.json'), JSON.stringify(minifiedPackage, null, 2), err => {
      if (err) throw err

      console.log(chalk.yellow('[build] Build package created'))
    })

  })
}

createPackage()
