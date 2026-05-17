import { Alert } from './Alert'

interface FormAlertProps {
  id?: string
  message: string
  onDismiss?: () => void
}

export function FormAlert({ id, message, onDismiss }: FormAlertProps) {
  return (
    <Alert id={id} variant="error" message={message} onDismiss={onDismiss} />
  )
}
