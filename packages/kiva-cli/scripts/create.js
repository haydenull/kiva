process.env.NODE_ENV = 'development'

const chalk = require('chalk')
const path = require('path')
const ora = require('ora')
const fs = require('fs-extra')
const inquirer = require('inquirer')
const validateNpmPackageName = require('validate-npm-package-name')

const TEMPLATE_PATH_MAP = {
  'react-spa': 'genReactSpaTemplate',         // react spa single entry
  'component': 'genComponentTemplate',        // vue component
  'component-library': 'genProjectTemplate',  // vue component library
}

async function create(projectName) {

  const cwd = process.cwd()
  const targetDir = path.resolve(cwd, projectName)

  // 检查 projectName 是否合法
  const validateNameRes = validateNpmPackageName(projectName)
  if (!validateNameRes.validForNewPackages) {
    console.error(chalk.red(`Invalid project name: "${projectName}"`))
    validateNameRes.errors && validateNameRes.errors.forEach(err => {
      console.error(chalk.red.dim('Error: ' + err))
    })
    validateNameRes.warnings && validateNameRes.warnings.forEach(warn => {
      console.error(chalk.red.dim('Warning: ' + warn))
    })
    process.exit(1)
  }

  // 同名文件夹已存在
  if (fs.existsSync(targetDir)) {
    const { ok } = await inquirer.prompt([
      {
        name: 'ok',
        type: 'confirm',
        message: `Target directory ${chalk.cyan(targetDir)} already exists. \nDo you want to overwrite them?`
      }
    ])
    if (!ok) {
      return
    }
    console.log(`\nRemoving ${chalk.cyan(targetDir)}...`)
    await fs.remove(targetDir)
  }

  const { type } = await inquirer.prompt([
    {
      name: 'type',
      type: 'list',
      message: 'Select the type of project you want to create',
      choices: [
        {
          name: 'react spa single entry',
          value: 'react-spa',
        },
        new inquirer.Separator(),
        {
          name: 'vue component',
          value: 'component',
        },
        {
          name: 'vue component library',
          value: 'component-library',
        }
      ],
    }
  ])

  // 生成文件
  await require(`../lib/${TEMPLATE_PATH_MAP[type]}`)(projectName, targetDir)

}

module.exports = (...args) => {
  return create(...args).catch(err => {
    console.error(chalk.red(`\n😭 create project error: \n`, err, '\n'))
    process.exit(1)
  })
}