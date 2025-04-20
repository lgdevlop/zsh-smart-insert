# Keyboard Shortcuts for zsh-smart-insert

This document lists and explains the default keyboard shortcuts available in the `zsh-smart-insert` plugin.

## 📂 Main Widgets

### `Alt+f`

- **Action:** File picker using `fd`
- **Behavior:** Opens FZF with file list and preview. Lets you choose a prefix (e.g., `vim`, `cat`, `less`, `bat`, `code`) before inserting.

### `Alt+g`

- **Action:** Filename search using `rg`
- **Behavior:** Lists all filenames using `ripgrep`, with preview and optional prefix before inserting.

### `Alt+s`

- **Action:** Content search using `rg`
- **Behavior:** Live reload search within files using `ripgrep` with real-time preview and prefix selection.

---

## 🔁 FZF Interaction Shortcuts (inside widget interface)

### `Ctrl+/`

- **Action:** Toggle preview window
- **Effect:** Enables or disables the file/content preview pane in FZF.

### `ESC` or `Ctrl+C`

- **Action:** Cancel current widget
- **Effect:** Exits the interface without inserting anything.

---

## 📝 Notes

- You can customize the default keybindings by editing the `bindkey` lines in `zsh-smart-insert.plugin.zsh`
- Prefix options available: `cat`, `vim`, `less`, `bat`, `code` (or no prefix)
- All inserted paths appear inline in your command buffer (`LBUFFER`)

---

_Last updated: 2025-04-19_
