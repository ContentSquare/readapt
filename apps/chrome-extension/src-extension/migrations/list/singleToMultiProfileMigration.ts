import { Migration } from '@extension/migrations/migration'
import { Persistence } from '@/persistence/persistence'

export class SingleToMultiProfileMigration implements Migration {
  constructor(private readonly persistence: Persistence) {}

  migrate(): void {
    const settingsOld = this.persistence.getItem('settings')
    if (!settingsOld) {
      return
    }
    this.persistence.setItem('settings@2', [
      {
        name: 'Default',
        profile: settingsOld
      }
    ])
  }
}
