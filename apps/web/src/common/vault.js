import { db } from "../common";
import { showPasswordDialog } from "../components/dialogs/passworddialog";

class Vault {
  static createVault() {
    return showPasswordDialog("create_vault", (password) =>
      db.vault.create(password)
    );
  }

  static unlockVault() {
    return showPasswordDialog("unlock_vault", (password) => {
      return db.vault
        .unlock(password)
        .then(() => true)
        .catch(() => false);
    });
  }

  static unlockNote(id) {
    return new Promise((resolve) => {
      return showPasswordDialog("unlock_note", (password) => {
        return db.vault
          .remove(id, password)
          .then(() => true)
          .catch((e) => {
            if (e.message === db.vault.ERRORS.wrongPassword) return false;
            else console.error(e);
          });
      }).then(resolve);
    });
  }

  static lockNote(id) {
    return new Promise(function lock(resolve) {
      db.vault
        .add(id)
        .then(resolve)
        .catch(({ message }) => {
          switch (message) {
            case db.vault.ERRORS.noVault:
              return Vault.createVault();
            case db.vault.ERRORS.vaultLocked:
              return Vault.unlockVault();
            default:
              return false;
          }
        })
        .then((result) => result && lock(resolve));
    });
  }
}
export default Vault;
