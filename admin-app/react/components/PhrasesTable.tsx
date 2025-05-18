import { Input, Table } from 'vtex.styleguide'

import { usePhraseClient } from '../hooks/usePhraseClient'
import { schema } from '../utils/getSchema'
import { useState } from 'react'
import { FormModal } from './FormModal'

const PhrasesTable = () => {
  const client = usePhraseClient()
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [selectedId, setSelectedId] = useState<string>(null)
  const [text, setText] = useState('')

  const lineActions = [
    {
      label: () => 'Eliminar',
      isDangerous: true,
      onClick: ({ rowData }) => {
        setSelectedId(rowData.id)
        setIsDeleteOpen(true)
      }
    }
  ]

  return (
    <>
      <Table
        density="high"
        fullWidth
        items={client.phrases?.getAllPhrases}
        lineActions={lineActions}
        loading={client.loadingPhrases}
        schema={schema}
        toolbar={{
          extraActions: {
            label: 'Más acciones',
            actions: [
              {
                label: 'Actualizar',
                handleCallback: () => client.refreshPhrases()
              }
            ]
          },
          newLine: {
            label: 'Agregar',
            handleCallback: () => setIsAddOpen(true)
          }
        }}
        totalizers={[
          {
            label: 'Cantidad de Frases',
            value: client.phrases?.getAllPhrases.length
          }
        ]}
      />

      <FormModal
        isOpen={isDeleteOpen}
        confirmLabel="Eliminar"
        isDangerous
        onCancel={() => {
          setIsDeleteOpen(false)
          setSelectedId(null)
        }}
        onConfirm={async () => {
          await client.deletePhrase({ variables: { id: selectedId } })
          setIsDeleteOpen(false)
          setSelectedId(null)
        }}
      >
        ¿Estás seguro que quieres eliminar esta frase?
      </FormModal>

      <FormModal
        isOpen={isAddOpen}
        confirmLabel="Agregar"
        onCancel={() => {
          setIsAddOpen(false)
          setText('')
        }}
        onConfirm={async () => {
          await client.postPhrase({ variables: { phrase: text } })
          setIsAddOpen(false)
          setText('')
        }}
      >
        <Input
          label="Escribe aquí tu frase"
          value={text}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setText(e.target.value)
          }
        />
      </FormModal>
    </>
  )
}

export default PhrasesTable
