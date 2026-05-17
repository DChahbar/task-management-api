import { Alert } from './Alert'

interface FormAlertProps {
  message: string
  onDismiss?: () => void
}

export function FormAlert({ message, onDismiss }: FormAlertProps) {
  return <Alert variant="error" message={message} onDismiss={onDismiss} />
}
