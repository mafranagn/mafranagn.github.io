import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const poetryDirectory = path.join(process.cwd(), 'poetry')

export async function getSortedPoetryData() {
  const fileNames = fs.readdirSync(poetryDirectory)
  const allPoetryData = await Promise.all(fileNames.map(async fileName => {
    const id = fileName.replace(/\.md$/, '')
    const fullPath = path.join(poetryDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const matterResult = matter(fileContents)

    const processedContent = await remark()
      .use(html)
      .process(matterResult.content)
    const contentHtml = processedContent.toString()

    const snippet = contentHtml.substring(0, 300).concat("...")

    return {  
      id,
      snippet,
      ...(matterResult.data as { date: string; title: string })
    }
  }))
  return allPoetryData.sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getAllPoetryIds() {
  const fileNames = fs.readdirSync(poetryDirectory)
  return fileNames.map(fileName => {
    return {
      params: {
        id: fileName.replace(/\.md$/, '')
      }
    }
  })
}

export async function getPoetryData(id: string) {
  const fullPath = path.join(poetryDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  const matterResult = matter(fileContents)

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content)
  const contentHtml = processedContent.toString()

  return {
    id,
    contentHtml,
    ...(matterResult.data as { date: string; title: string })
  }
}