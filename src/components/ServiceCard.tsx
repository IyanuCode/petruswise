import React from 'react'

export default function ServiceCard({title, description}:{title:string; description:string}) {
  return (
    <div>
      <div>{title}</div>
      <p>{description}</p>
      <a href="/services"></a>
    </div>
  )
}
