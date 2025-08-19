import { describe, it, expect } from 'vitest'
import { render } from 'vitest-browser-react'

describe('math', () => {
  it('loads and displays greeting', async () => {
    const screen = render(<h1>Hello world</h1>)

    const heading = screen.getByRole('heading')

    await expect.element(heading).toHaveTextContent('Hello world')
  })
})
