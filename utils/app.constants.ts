//Создаю константы для проекта, имена crm-base  crm-base  deals... давал на appwrite
//crm-react - id проекта который указал при создании проека на appwrite
//Создаю коллекции- таблицы в базе данных crm-base,те у каждой  сущности есть своя таблица в БД crm-base
//у сущности есть связи с другими сущностями: Сделка связана с Клиентом и Комментариями
//У каждой коллекции будут свои документы
export const APP_WRITE_ID = 'crm-react'
export const DB_ID = 'crm-base' //'crm-system-nuxt-record'
export const COLLECTION_DEALS = 'deals'
export const COLLECTION_CUSTOMERS = 'customers'
export const COLLECTION_COMMENTS = 'comments'
export const STORAGE_ID = 'storage'
