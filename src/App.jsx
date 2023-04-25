import React, { useEffect, useState } from 'react'
import './App.css'

const urlImgDefault =
  'https://kaverisias.com/wp-content/uploads/2018/01/catalog-default-img.gif'
const apiGetFact = 'https://catfact.ninja/fact'

export default function App () {
  const [fact, setFact] = useState()
  const [imageUrl, setImageUrl] = useState('')
  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    fetch(apiGetFact)
      .then(response => {
        if (!response.ok) setIsError(true)
        return response.json()
      })
      .then(data => {
        const { fact } = data
        setFact(fact)
      })
  }, [])

  useEffect(() => {
    if (!fact) return
    const firstWord = fact.split(' ', 3).join(' ')
    console.log(firstWord)
    if (!firstWord) return
    setIsLoading(true)
    fetch(
      `https://cataas.com/cat/says/${firstWord}?json=true&size=50&color=red`
    )
      .then(response => response.json())
      .then(img => setImageUrl(img.url))
      .catch(() => setImageUrl(urlImgDefault))
      .finally(() => setIsLoading(false))
  }, [fact])

  return (
    <div className='app-container'>
      <div className='body'>
        <img src='/public/logo.png' />
        {!isError && fact && <p>{fact}</p>}
        {isLoading ? (
          <span>loading...</span>
        ) : (
          <img
            className='cat-img'
            src={`https://cataas.com/${imageUrl}` || { urlImgDefault }}
            alt={`description to ${fact}`}
          />
        )}
      </div>
    </div>
  )
}
