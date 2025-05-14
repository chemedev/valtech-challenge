import React, { Fragment } from 'react'

interface WidgetBtnProps {
  options: {
    link: string
    text: string
  }
}

function WidgetButton(props: WidgetBtnProps) {
  const { options } = props

  if (!options?.link || !options?.text) return <Fragment />

  return (
    <div
      style={{
        borderRadius: '6px',
        background: '#4f2170',
        textAlign: 'center',
        width: '100%',
        padding: '.75rem'
      }}
    >
      <a
        href={options.link}
        rel="noreferrer"
        style={{
          color: '#fff',
          textDecoration: 'none',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: 0,
          fontSize: '1rem'
        }}
        target="_blank"
      >
        {options.text}
      </a>
    </div>
  )
}

export default WidgetButton
