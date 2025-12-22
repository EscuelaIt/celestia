'use client'

import type { FC } from 'react'
import { useConfirmListener } from '@/core/react/use-confirm-listener'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

export const ConfirmDialog: FC = () => {
  const { confirm, handleConfirm, handleCancel } = useConfirmListener()

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
          <Button variant="destructive" onClick={handleConfirm}>
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
