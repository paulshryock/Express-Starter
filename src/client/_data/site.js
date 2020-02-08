const site = {
  title: 'Express and Eleventy',
  shortName: 'ExpressEleventy',
  description: 'Site description',
  year: new Date().getFullYear()
}

site.copyright = `&copy; ${site.year} ${site.title}. All rights reserved.`

module.exports = site
