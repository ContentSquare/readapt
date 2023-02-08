import { openDialog } from 'vue3-promise-dialog'
import ConfirmDialog from './ConfirmDialog.vue'

export async function confirm(text: string) {
  console.log('Called!')
  return await openDialog(ConfirmDialog, { text })
}
