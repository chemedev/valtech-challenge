import type { JSX } from 'react'

import type { Structure } from '../typings/Structure'

export type PropertySchema = {
  title: string
  cellRenderer: (props: { cellData: string }) => JSX.Element
}

export type Schema = {
  properties: Record<string, PropertySchema>
}

export function filterStructureFields(structure: Structure): Structure {
  const columnFields = ['id', 'CookieFortune']
  const filteredFields = structure.fields.filter((field) =>
    columnFields.includes(field.name)
  )

  return {
    ...structure,
    fields: filteredFields
  }
}

export const generateSchema = (structure: Structure) => {
  const schema: Schema = {
    properties: {}
  }

  const _structure = filterStructureFields(structure)

  for (const field of _structure.fields) {
    schema.properties[field.name] = {
      title: field.displayName || field.name,
      cellRenderer: ({ cellData }: { cellData: string }) => {
        return <span className="nowrap pointer">{cellData}</span>
      }
    }
  }

  return schema
}

export const schema = generateSchema({
  acronym: 'CF',
  name: 'Cookie Fortune',
  primaryKeyType: 'GUID',
  allowGetAll: true,
  fields: [
    {
      name: 'id',
      type: 'Varchar 100',
      displayName: 'Document ID',
      isNullable: false,
      isSearchable: true,
      isFilter: false,
      isInternal: false
    },
    {
      name: 'CookieFortune',
      type: 'Varchar 750',
      displayName: 'CoookieFortune',
      isNullable: true,
      isSearchable: true,
      isFilter: false,
      isInternal: false
    }
  ]
})
