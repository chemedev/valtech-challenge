import React from 'react'
import { Layout, PageBlock, PageHeader, ToastProvider } from 'vtex.styleguide'

import PhrasesTable from './components/PhrasesTable'
import './styles.global.css'

const PhrasesLayout = () => {
  return (
    <Layout pageHeader={<PageHeader title="Frases" />}>
      <PageBlock variation="full">
        <ToastProvider positioning="window">
          <PhrasesTable />
        </ToastProvider>
      </PageBlock>
    </Layout>
  )
}

export default PhrasesLayout
