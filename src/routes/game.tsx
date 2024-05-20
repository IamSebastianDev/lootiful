import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/game')({
  component: () => <div>Hello /game!</div>
})