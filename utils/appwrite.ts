import { APP_WRITE_ID } from './app.constants'
import { Account, Client, Databases, Storage } from 'appwrite'

// сlient - для запросов к БД Storage и аккаунту
export const client = new Client()

client.setEndpoint('https://cloud.appwrite.io/v1').setProject(APP_WRITE_ID)

export const account = new Account(client) // Для авторизации пльзователя
export { ID } from 'appwrite'
export const DB = new Databases(client) // Получение документов и редактирования их
export const storage = new Storage(client) // Для записи картинок и др. файлов