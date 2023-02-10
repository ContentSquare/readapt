import { openDialog } from 'vue3-promise-dialog'
import DialogConfirm from './DialogConfirm.vue'
import DialogAlert from './DialogAlert.vue'
import DialogPrompt from './DialogPrompt.vue'

export async function confirm(text: string) {
  return await openDialog(DialogConfirm, { text })
}

export async function alert(text: string) {
  return await openDialog(DialogAlert, { text })
}

export async function prompt(text: string, initialValue = '') {
  return await openDialog(DialogPrompt, { text, initialValue })
}
