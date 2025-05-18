import { useState } from 'react'
import { ModalDialog } from 'vtex.styleguide'

type FormModalProps = {
  isOpen: boolean
  title?: string
  confirmLabel?: string
  isDangerous?: boolean
  children: React.ReactNode
  onCancel: () => void
  onConfirm: () => Promise<void>
}

export function FormModal({
  isOpen,
  title,
  confirmLabel = 'Confirmar',
  isDangerous = false,
  children,
  onCancel,
  onConfirm
}: FormModalProps) {
  const [loading, setLoading] = useState(false)

  const handleConfirm = async () => {
    setLoading(true)
    await onConfirm()
    setLoading(false)
  }

  return (
    <ModalDialog
      centered
      title={title}
      isOpen={isOpen}
      loading={loading}
      cancelation={{
        label: 'Cancelar',
        onClick: onCancel
      }}
      confirmation={{
        label: confirmLabel,
        isDangerous,
        onClick: handleConfirm
      }}
      onClose={onCancel}
    >
      {children}
    </ModalDialog>
  )
}
