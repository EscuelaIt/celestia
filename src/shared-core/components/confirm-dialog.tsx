'use client'

import type { FC } from 'react'
import { Dialog } from '@radix-ui/react-dialog'
import { DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/core/components/ui/dialog'
import { Button } from '@/shared-core/components/ui/button'
import { useConfirmListener } from '@/shared-core/hooks/use-confirm-listener'

export const ConfirmDialog: FC = () => {
  const { confirm, handleConfirmed, handleCancel } = useConfirmListener()

  if (!confirm) {
    return null
  }

  return (
    <Dialog open={!!confirm} onOpenChange={handleCancel}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{confirm}</DialogTitle>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleConfirmed}>
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
