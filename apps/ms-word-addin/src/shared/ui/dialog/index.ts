import { openDialog } from 'vue3-promise-dialog'
import DialogConfirm from './DialogConfirm.vue'
import DialogAlert from './DialogAlert.vue'
import DialogPrompt from './DialogPrompt.vue'

export async function confirm(text: string): Promise<boolean> {
  return await openDialog(DialogConfirm, { text })
}

export async function alert(text: string): Promise<void> {
  return await openDialog(DialogAlert, { text })
}

export async function prompt(text: string, initialValue = ''): Promise<string | null> {
  return await openDialog(DialogPrompt, { text, initialValue })
}
